import { defaultEnvironment } from "./environment.default";

export const environment = {
  ...defaultEnvironment,
  production: false,
  BACKEND: 'http://localhost:8080'
};
