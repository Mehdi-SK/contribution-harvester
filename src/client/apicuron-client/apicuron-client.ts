import { ContributionPayload } from '../../types/contribution-payload.type.js'
import { IExternalClient } from '../IExternalClient.js'

export class ApicuronClient implements IExternalClient {
  private token: string = '<API_TOKEN>'
  private apiUrl: string = '<API_URL>'
  private logger = console
  async sendPayload(payload: ContributionPayload[]): Promise<void> {}

  private async sendReportsToApicuron(
    reports: any[],
    resource_id: string
  ): Promise<Response> {
    const requestBody = { reports }
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
        version: '2'
      },
      body: JSON.stringify(requestBody)
    })

    const contentType = response.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const responseBody = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      this.logger.error(`API Error: ${response.status} ${response.statusText}`)
      this.logger.error(`Response body: ${JSON.stringify(responseBody)}`)
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      )
    }
    return response
  }
}
