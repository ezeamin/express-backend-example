import envvar from 'env-var';

const { get } = envvar;

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URI: get('MONGO_URI').required().asString(),
  JWT_SECRET_KEY: get('JWT_SECRET_KEY').required().asString(),
};
