
import { IEventProcessorStrategy } from './IEventProcessorStrategy.js';
import { PRStrategy } from './pull-request/PRStrategy.js';
import { PushStrategy } from './push/PushStrategy.js';

export const processors: IEventProcessorStrategy[] = [
 new PushStrategy(),
 new PRStrategy()
];