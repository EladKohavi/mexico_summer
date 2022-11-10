import { Octokit } from 'octokit';
import { createAppAuth } from '@octokit/auth-app';
import { GH_APP_ID, GH_APP_PRIVATE_KEY } from './env';

export async function createOctokit(installationId: number) {
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: GH_APP_ID,
      privateKey: GH_APP_PRIVATE_KEY,
      installationId
    }
  });
  const { data: token } = await octokit.rest.apps.createInstallationAccessToken({
    installation_id: installationId
  });

  return {
    octokit,
    installationAccessToken: token
  };
}
