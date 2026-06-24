import { ContributionPayload } from '../../types/contribution-payload.type.js'
import { GHPushEventPayload } from '../../types/payloads/payload.types.js'
import { IEventProcessorStrategy } from '../IEventProcessorStrategy.js'

export class PushStrategy implements IEventProcessorStrategy {
  canHandle(event: string): boolean {
    return event === 'push'
  }
  async process(
    payload: GHPushEventPayload
  ): Promise<ContributionPayload[] | null> {
    throw new Error('Not implemented')
  }
}
