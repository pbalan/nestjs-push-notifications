import { PushAdapter } from './interfaces/pushAdapter'

export class PushManager {
  async getAdapter(adapter: string, config: Record<string, any>): Promise<PushAdapter> {
    const { adapterClass } = config

    const pushAdapter = await import(`${config.transport}`)
    const adapterInstance = new pushAdapter[adapterClass](adapter, config)
    return adapterInstance
  }
}
