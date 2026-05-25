import { EmitterWebhookEvent } from '@octokit/webhooks'

export type TPushEventPayload = EmitterWebhookEvent<'push'>['payload']
export type TPullRequestPayload = EmitterWebhookEvent<'pull_request'>['payload']
