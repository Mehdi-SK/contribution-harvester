import { PRPayload } from '../../../types/contribution-payload.type.js'
import { GHPullRequestPayload } from '../../../types/payloads/payload.types.js'
import { IPRActionHandler } from '../PREventHandler.js'

export class PRMergedEventHandler implements IPRActionHandler {
  canHandle(payload: GHPullRequestPayload): boolean {
    return payload.action === 'closed' && payload.pull_request.merged === true
  }
  process(payload: GHPullRequestPayload): PRPayload[] {
    const { pull_request, repository } = payload
    return []
  }
}
