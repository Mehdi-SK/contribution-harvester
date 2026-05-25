import { ContributionPayload } from '../../types/contribution-payload.type.js'
import { TPushEventPayload } from '../../types/payloads/payload.types.js'
import { IEventProcessorStrategy } from '../IEventProcessorStrategy.js'


export class PushStrategy implements IEventProcessorStrategy {
  canHandle(event: string): boolean {
    return event === 'push'
  }
  process(payload: TPushEventPayload): ContributionPayload[] | null {
    return payload.commits.map((commit) => {
      return {
        contribution_id: `push-${payload.repository.full_name}-${commit.id}`,
        developer_identifier:
          commit.author?.name || payload.pusher?.name || null,
        repository: payload.repository.full_name,
        event_type: 'coding_contribution',
        timestamp: commit.timestamp || new Date().toISOString(),
        metadata: {
          commit_count: payload.commits?.length || 0,
          commits_shas: payload.commits?.map((c) => c.id) || [],
        }
      }
    })
  }
}
