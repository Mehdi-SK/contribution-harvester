import { ContributionPayload } from "../../types/contribution-payload.type.js";
import { TPullRequestPayload } from "../../types/payloads/payload.types.js";



export interface PRActionHandler {
  canHandle(action: string, payload: TPullRequestPayload): boolean;
  process(payload: TPullRequestPayload): ContributionPayload[];
}