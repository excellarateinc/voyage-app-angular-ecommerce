// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_URL: 'http://qa-api-ms.voyageframework.com/api/v1',
  SERVER_URL: 'http://qa-web-ms.voyageframework.com',
  OAUTH_REDIRECT_URL: 'http://localhost:3000/store',
  OAUTH_CLIENT_ID: 'client-super-qa',
  OAUTH_CLIENT_SECRET: 'secret'
};
