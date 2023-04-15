import { defaultEnvironment } from "./environment.default";

export const environment = {
  ...defaultEnvironment,
  production: true,
  BACKEND: 'http://localhost:8080'
};
