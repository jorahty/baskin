// const glob = require('glob');
// const path = require('path');
// const { apiResolver } = require('next/dist/server/api-utils/node');
//
// const rootPath = path.resolve('.');
// const nextPagesDirectory = `${rootPath}/src/pages`
//
// const handlers = glob.sync(`${nextPagesDirectory}/api/**/*.ts`).map((handler) =>
//   handler.slice(nextPagesDirectory.length, -3));
//
// const mapping = {};
// handlers.forEach((handler) => {
//   mapping[handler] = require(`${nextPagesDirectory}${handler}`);
// });
//
// const requestHandler = (
//   request,
//   response,
// ) => {
//   let nurl = request.url
//   let query = { }
//   if (request.url.indexOf('/api/graphql') < 0) {
//     nurl = '/api/book/[isbn]'
//     const [_slash, _api, _book, isbn] = request.url.split('/');
//     query = { isbn: isbn }
//   }
//   return apiResolver(
//     Object.assign(request, { connection: { remoteAddress: 'localhost' } }),
//     response,
//     query,
//     mapping[nurl],
//     undefined,
//     true,
//   );
// };
//
// export default requestHandler
