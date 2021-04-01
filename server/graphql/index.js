const { parse, execute, validate, Source, specifiedRules } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const executeQuery = async ({ request, variables }) => {
  let parsedQuery = null;
  try {
    parsedQuery = parse(new Source(request));
  } catch (exception) {
    console.error('parsing', exception);
    return { requestId: variables.requestId, error: { code: 'QUERY_PARSING_ERROR' } };
  }
  const validationErrors = validate(schema, parsedQuery, [...specifiedRules]);
  if (validationErrors.length > 0) {
    console.error('validationErrors', validationErrors);
    return { requestId: variables.requestId, error: { code: 'QUERY_VALIDATION_ERROR' } };
  }
  let result = null;

  try {
    result = await execute(schema, parsedQuery, null, {}, variables);
  } catch (exception) {
    console.error('execute', exception);
    return { requestId: variables.requestId, error: { code: 'QUERY_EXECUTION_ERROR' } };
  }

  // console.error('result', result);
  if (result.errors) {
    console.error(result.errors);
    return {
      requestId: variables.requestId,
      error: { code: 'QUERY_EXECUTION_ERROR' },
    };
  }
  return result;
};

module.exports = {
  schema,
  executeQuery,
};
