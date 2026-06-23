import { GitHubClient } from '../../../client/github/github-client.js'
import { ContributionPayload } from '../../../types/contribution-payload.type.js'
import { GHPullRequestPayload } from '../../../types/payloads/payload.types.js'

export async function extractReviewers(
  payload: GHPullRequestPayload
): Promise<ContributionPayload[]> {
  const reviews = await GitHubClient.getPRReviews(
    payload.repository.owner.login,
    payload.repository.name,
    payload.pull_request.number
  )

  reviews.filter
}
