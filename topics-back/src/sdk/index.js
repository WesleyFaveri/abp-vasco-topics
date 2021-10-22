import registerApi from 'api';

export const registerSdk = (app, apiPath = '/api') => {
  app.use(apiPath, registerApi());

  return app;
};

export default registerSdk;
