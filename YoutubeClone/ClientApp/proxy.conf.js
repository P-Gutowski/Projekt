const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:22509';

const PROXY_CONFIG = [
  {
    context: [
      "/movies/streamtestvideofile",
      "/_configuration",
      "/.well-known",
      "/Identity",
      "/connect",
      "/ApplyDatabaseMigrations",
      "/_framework",
      "/Movies",
      "/Movies/Details/:id",
      "/Movies/Create",
      "/Movies/Edit/:id",
      "/Tags",
      "/Tags/Details/:id",
      "/Tags/Create",
      "/Tags/Edit/:id",
      "/Ratings",
      "/Ratings/Details/:id",
      "/Ratings/Create",
      "/Ratings/Edit/:id",
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
