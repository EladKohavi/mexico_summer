import { createOctokit } from '.';

export const createPullRequest = async ({ owner, repo, head, base }, installationId) => {
  const { octokit } = await createOctokit(installationId);
  const prResponse = await octokit.rest.pulls.create({
    owner,
    repo,
    head,
    base
  });

  return prResponse?.data;
};

export const getAllChecksForRef = async ({ owner, repo, ref }, installationId) => {
  const { octokit } = await createOctokit(installationId);
  const checks: any = await octokit.rest.checks.listForRef({
    owner,
    repo,
    ref
  });
  return checks?.data?.check_runs;
};

export const getAllLabelsForPR = async ({ owner, repo, issue_number }, installationId) => {
  const { octokit } = await createOctokit(installationId);
  const labelsResponse = await octokit.rest.issues.listLabelsOnIssue({
    owner,
    repo,
    issue_number
  });
  return labelsResponse?.data;
};

export const getAllReviewsForPR = async ({ owner, repo, pull_number }, installationId) => {
  const { octokit } = await createOctokit(installationId);
  const reviewsResponse = await octokit.rest.pulls.listReviews({
    owner,
    repo,
    pull_number
  });

  return reviewsResponse?.data;
};
