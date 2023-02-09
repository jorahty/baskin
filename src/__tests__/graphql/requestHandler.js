const glob = require('glob');
const path = require('path');
const { apiResolver } = require('next/dist/server/api-utils/node');

const rootPath = path.resolve('.');
const nextPagesDirectory = `${rootPath}/src/pages`

const handlers = glob.sync(`${nextPagesDirectory}/api/**/*.ts`).map((handler) => 
  handler.slice(nextPagesDirectory.length, -3));

const mapping = {};
handlers.forEach((handler) => {
  mapping[handler] = require(`${nextPagesDirectory}${handler}`);
});

const requestHandler = (
  request,
  response,
) => {
  return apiResolver(
    Object.assign(request, { connection: { remoteAddress: 'localhost' } }),
    response,
    {},
    mapping[request.url],
    undefined,
    true,
  );
};

export default requestHandler
