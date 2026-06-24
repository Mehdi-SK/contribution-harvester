import { GitHubClient } from '../../../client/github/github-client.js'
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

  return reviews.filter((r) => r.state !== 'COMMENTED')
}
