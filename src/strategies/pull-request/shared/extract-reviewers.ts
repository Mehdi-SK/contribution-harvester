import { GitHubClient } from '../../../client/github/github-client.js'
import { logger } from '../../../logger/logger.js'
import { TReview } from '../../../types/contribution-payload.type.js'

export async function getPullRequestReviewers(
  owner_login: string,
  repo_name: string,
  pr_number: number
): Promise<TReview[]> {
  const reviews = await GitHubClient.getPRReviews(
    owner_login,
    repo_name,
    pr_number
  )

  return reviews.filter((r) => {
    logger.debug(
      `Reviewer: ${JSON.stringify(r)} for PR ${pr_number} in ${owner_login}/${repo_name}`
    )
    return r.state !== 'COMMENTED'
  })
}
