import { ContributionPayload as TContributionPayload } from '../../types/contribution-payload.type.js'
import { GHPullRequestPayload } from '../../types/payloads/payload.types.js'
import { IEventProcessorStrategy } from '../IEventProcessorStrategy.js'
import { IPRActionHandler } from './PREventHandler.js'

export class PRStrategy implements IEventProcessorStrategy {
  private readonly handlers: IPRActionHandler[] = []

  canHandle(event: string): boolean {
    return event === 'pull_request'
  }
  async process(
    payload: GHPullRequestPayload
  ): Promise<TContributionPayload[] | null> {
    const handler = this.handlers.find((h) => h.canHandle(payload))
    return handler ? await handler.process(payload) : null
  }
}
