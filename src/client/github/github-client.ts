import * as github from '@actions/github'
import { logger } from '../../logger/logger.js'
type TReview = {
  username: string
  state: string
  submitted_at: string
}

export class GitHubClient {
  private static octokit: ReturnType<typeof github.getOctokit>

  static initialize(token: string): void {
    this.octokit = github.getOctokit(token)
  }

  static async getPRReviews(
    owner: string,
    repo: string,
    pullNumber: number
  ): Promise<TReview[]> {
    const { data } = await this.octokit.rest.pulls.listReviews({
      owner,
      repo,
      pull_number: pullNumber
    })

    return data
      .filter(
        (
          review
        ): review is typeof review & {
          user: NonNullable<(typeof review)['user']> // Ensure that the user is neither null nor undefined
        } => {
          if (!!review.user) {
            return true
          }
          logger.info(
            `Review without user found. Skipping this review. ${JSON.stringify(review)}`
          )
          return false
        }
      )
      .map((review) => {
        return {
          username: review.user.login,
          state: review.state,
          submitted_at: review.submitted_at || Date.now().toString()
        }
      })
  }
}
