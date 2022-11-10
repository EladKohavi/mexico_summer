import { Octokit } from 'octokit';
import {
  GITSTREAM_NAME,
  GitstreamActions,
  GITSTREAM_GATE_CHECK_NAME,
  GITSTREAM_WORKFLOW_NAME,
  GITSTREAM_CHECK_PREFIX,
  CheckStatus,
  CheckConclusion
} from './consts';
import { REPO_OWNER, REPO_NAME, CURRENT_BRANCH, BASE_BRANCH, INSTALLATION_ID } from './octokit/env';
import {
  createPullRequest,
  getAllChecksForRef,
  getAllLabelsForPR,
  getAllReviewsForPR
} from './octokit/octokit.service';

const getChecksStatus = async () => {
  const checks = await getAllChecksForRef({ owner: REPO_OWNER, repo: REPO_NAME, ref: CURRENT_BRANCH }, INSTALLATION_ID);
  return checks
    .filter(({ name }) => !isGitstreamCheck(name))
    .every(({ status, conclusion }) => status === CheckStatus.completed && conclusion !== CheckConclusion.failure);
};

const isGitstreamCheck = (checkName: string) => {
  const isItGitstreamCheck =
    checkName.toLocaleLowerCase().includes(GITSTREAM_NAME.toLocaleLowerCase()) ||
    [...Object.values(GitstreamActions), GITSTREAM_GATE_CHECK_NAME, GITSTREAM_WORKFLOW_NAME]
      .map((checkName) => checkName.toLocaleLowerCase())
      .includes((checkName?.toLocaleLowerCase() || '').replace(GITSTREAM_CHECK_PREFIX, '').trim());
  return isItGitstreamCheck;
};

export const handler = async (event) => {
  try {
    const pr = await createPullRequest(
      { owner: REPO_OWNER, repo: REPO_NAME, head: CURRENT_BRANCH, base: BASE_BRANCH },
      INSTALLATION_ID
    );

    let allPassed = await getChecksStatus();

    while (!allPassed) {
      sleeps(100);
      allPassed = await getChecksStatus();
    }

    const labels = await getAllLabelsForPR(
      { owner: REPO_OWNER, repo: REPO_NAME, issue_number: pr.id },
      INSTALLATION_ID
    );
    const reviews = await getAllReviewsForPR(
      { owner: REPO_OWNER, repo: REPO_NAME, pull_number: pr.id },
      INSTALLATION_ID
    );

    //assert labels
    //assert reviews

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' }
    };
  } catch (e) {
    console.error('failed to run e2e', e);
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' }
    };
  }
};
