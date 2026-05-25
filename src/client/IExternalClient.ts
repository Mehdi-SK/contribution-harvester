import { ContributionPayload } from '../types/contribution-payload.type.js'

export interface IExternalClient {
  sendPayload(payload: ContributionPayload[]): Promise<void>
}
