export interface ContributionPayload {
  contribution_id: string;
  developer_identifier: string;
  repository: string;
  activity_type: string;
  timestamp: string;
  metadata: Record<string, any>;
}
