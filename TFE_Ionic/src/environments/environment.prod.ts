import { env } from '../../.env';

export const environment = {
  production: true,
  mock: false,
  apiUrl: 'http://localhost/M-A-R-X_Backend/public/',
  jwtTokenSign: 'iliketrain',
  clientID: env.clientID,
  domain: env.domain,
  packageIdentifier: env.packageIdentifier,
  redirectUriWeb: env.redirectUriWeb,
  redirectUriMobile: env.redirectUriMobile
};
