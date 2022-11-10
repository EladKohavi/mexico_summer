function getEnv(varName, defaultValue?) {
  let envVariable = process.env[varName];
  if (!envVariable && defaultValue === undefined) {
    throw new Error(`environment variable ${varName} is undefined`);
  }

  return envVariable || defaultValue;
}

export const GH_APP_PRIVATE_KEY = getEnv('GH_APP_PRIVATE_KEY');
export const GH_APP_ID = getEnv('GH_APP_ID');
export const REPO_OWNER = getEnv('REPO_OWNER');
export const REPO_NAME = getEnv('REPO_NAME');
export const CURRENT_BRANCH = getEnv('CURRENT_BRANCH');
export const BASE_BRANCH = getEnv('BASE_BRANCH');
export const INSTALLATION_ID = getEnv('INSTALLATION_ID');
