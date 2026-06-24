import {
  EventTypes,
  PRPayload
} from '../../../types/contribution-payload.type.js'
import { GHPullRequestPayload } from '../../../types/payloads/payload.types.js'
import { IPRActionHandler } from '../PREventHandler.js'
import { getPullRequestReviewers } from '../shared/extract-reviewers.js'

export class PRMergedEventHandler implements IPRActionHandler {
  canHandle(payload: GHPullRequestPayload): boolean {
    return payload.action === 'closed' && payload.pull_request.merged === true
  }
  async process(payload: GHPullRequestPayload): Promise<PRPayload[]> {
    const { pull_request, repository } = payload
    const reviews = await getPullRequestReviewers(
      repository.owner.login,
      repository.name,
      pull_request.number
    )
    if (!pull_request.user) {
      throw new Error('Pull request user is null')
    }
    const outputPayload: PRPayload = {
      contribution_id: `pull_request-merged-${repository.owner.login}-${repository.name}-${pull_request.number}`,
      github_login: pull_request.user.login,
      context: {
        pr_id: pull_request.id.toString(),
        pr_url: pull_request.html_url,
        labels: pull_request.labels.map((label) => label.name),
        reviewers: reviews,
        target_branch: pull_request.base.ref,
        title: pull_request.title
      },
      timestamp: pull_request.merged_at ?? new Date().toISOString(),
      repository: repository.full_name,
      event_type: EventTypes.PULL_REQUEST
    }
    return [outputPayload]
  }
}
