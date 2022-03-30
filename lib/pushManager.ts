import { loadAdapter } from './helpers'
import { PushAdapter } from './interfaces'

export class PushManager {
  getAdapter(transport: string, config: Record<string, any>): PushAdapter {
    const adapter = loadAdapter(config.transport)
    return new adapter(transport, config)
  }
}
