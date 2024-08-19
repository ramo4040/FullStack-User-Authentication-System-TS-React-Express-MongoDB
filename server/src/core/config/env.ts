import 'dotenv/config'
import { get } from 'env-var'

const env = {
  port: get('PORT').required().asPortNumber(),
  apiPrefix: get('API_PREFIX').default('/api/v1').required().asString(),
  mongodb_uri: get('MONGODB_URI').required().asUrlString(),

  ACCESS_TOKEN: {
    secret: get('AUTH_ACCESS_TOKEN_SECRET').required().asString(),
    expire: get('AUTH_ACCESS_TOKEN_EXPIRY').required().asString(),
  },
  REFRESH_TOKEN: {
    secret: get('AUTH_REFRESH_TOKEN_SECRET').required().asString(),
    expire: get('AUTH_REFRESH_TOKEN_EXPIRY').required().asString(),
  },
  EMAIL: {
    secret: get('EMAIL_TOKEN_SECRET').required().asString(),
    expire: get('EMAIL_TOKEN_EXPIRY').required().asString(),
  },
  MAILER: {
    user: get('AUTH_EMAIL_USER').required().asEmailString(),
    pass: get('AUTH_EMAIL_PASS').required().asString(),
  },
  GOOGLE: {
    CLIENT_ID: get('GOOGLE_CLIENT_ID').required().asString(),
    CLIENT_SECRET: get('GOOGLE_CLIENT_SECRET').required().asString(),
    REDIRECT_URI: get('GOOGLE_REDIRECT_URI').required().asUrlString(),
  },
}
export default env
