export interface ContributionPayload {
  contribution_id: string;
  developer_identifier: string | null;
  repository: string;
  event_type: string;
  timestamp: string;
  metadata: Record<string, any>;
}
