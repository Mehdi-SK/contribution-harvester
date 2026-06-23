interface BasePayload {
  contribution_id: string;
  github_login: string | null;
  repository: string;
  timestamp: string;
}

export interface PRPayload extends BasePayload {
  event_type: "pull_request";
  context: {
    pr_id: string;
    pr_url: string;
    target_branch: string;
    labels: string[];
    reviewers: string[];
    title: string;
  };
}

// example for antoher contribution type
export interface ReleasePayload extends BasePayload {
  event_type: "release";
  context: {
    release_tag: string;
    release_url: string;
  };
}

export type ContributionPayload = PRPayload | ReleasePayload;