export enum PullRequestState {
  approve = 'APPROVE',
  REQUEST_CHANGES = 'REQUEST_CHANGES',
  UPDATE_LABELS = 'UPDATE_LABELS'
}

export enum PullRequestReviewState {
  approved = 'APPROVED'
}

export const GITSTREAM_NAME = 'gitStream';
export const GITSTREAM_GATE_CHECK_NAME = 'gitStream.cm';
export const GITSTREAM_WORKFLOW_NAME = 'gitStream workflow automation';

export enum CheckStatus {
  completed = 'completed',
  in_progress = 'in_progress',
  queued = 'queued'
}

export const GITSTREAM_CHECK_PREFIX = '- ';

export enum CheckConclusion {
  action_required = 'action_required',
  cancelled = 'cancelled',
  failure = 'failure',
  neutral = 'neutral',
  success = 'success',
  skipped = 'skipped',
  stale = 'stale',
  timed_out = 'timed_out'
}

export enum GitstreamActions {
  Approve = 'approve@v1',
  SetRequiredApprovals = 'set-required-approvals@v1',
  AddLabels = 'add-labels@v1',
  AddLabel = 'add-label@v1',
  AddComment = 'add-comment@v1',
  UpdateCheck = 'update-check@v1',
  AddReviewers = 'add-reviewers@v1',
  MergeV1 = 'merge@v1',
  RequestChangesV1 = 'request-changes@v1',
  RequireReviewersV1 = 'require-reviewers@v1'
}

export const GIT_PROVIDERS = {
  GITHUB: 'github'
};
