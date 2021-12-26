import { env } from '../../.env';

export const environment = {
  production: true,
  mock: false,
  apiUrl: env.apiUrlProd,
  jwtTokenSign: env.jwtTokenSign,
  clientID: env.clientID,
  domain: env.domain,
  packageIdentifier: env.packageIdentifier,
  redirectUriWeb: env.redirectUriWeb,
  redirectUriMobile: env.redirectUriMobile
};
