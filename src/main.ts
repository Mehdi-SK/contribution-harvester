import { processors } from './strategies/index.js'
import * as github from '@actions/github'
export async function run(): Promise<void> {
  const event = github.context.eventName
  const payload = github.context.payload

  const processor = processors.find((p) => p.canHandle(event))
  const trackedEvents = processor ? processor.process(payload) : null

  console.log(JSON.stringify(trackedEvents, null, 2))
}
