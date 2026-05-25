import { ContributionPayload as TContributionPayload } from '../../types/contribution-payload.type.js'
import { TPullRequestPayload } from '../../types/payloads/payload.types.js'
import { IEventProcessorStrategy } from '../IEventProcessorStrategy.js'
import { PRActionHandler } from './PREventHandler.js'

export class PRStrategy implements IEventProcessorStrategy {
  private readonly handlers: PRActionHandler[] = []

  canHandle(event: string): boolean {
    return event === 'pull_request'
  }

  process(payload: TPullRequestPayload): TContributionPayload[] | null {
    const handler = this.handlers.find((h) =>
      h.canHandle(payload.action, payload)
    )
    return handler ? handler.process(payload) : null
  }
}
