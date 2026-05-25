import { ContributionPayload } from '../../../types/contribution-payload.type.js'
import { TPullRequestPayload } from '../../../types/payloads/payload.types.js'
import { PRActionHandler } from '../PREventHandler.js'

export class PRMergedEventHandler implements PRActionHandler {
  canHandle(action: string, payload: TPullRequestPayload): boolean {
    return payload.action === 'closed' && payload.pull_request.merged === true
  }
  process(payload: TPullRequestPayload): ContributionPayload[] {
    throw new Error('Method not implemented.')
  }
}
