import { PushAdapter } from './interfaces/pushAdapter'

export class PushManager {
  async getAdapter(adapter: string, config: Record<string, any>): Promise<PushAdapter> {
    const { adapterClass } = config
    const adapterName = config.transport

    try {
      const pushAdapter = await import(`${adapterName}`)
      const adapterInstance: PushAdapter = new pushAdapter[adapterClass](adapter, config)
      return adapterInstance
    } catch (err) {
      console.log(`An error occurred while instatiating adapter: ${adapterName}`)
      console.log(err)
      throw err
    }
  }
}
