import { Inject, Injectable } from '@nestjs/common'
import { PushAdapter, PushOptions } from './interfaces'
import { map } from './provider.map'
import { PushManager } from './pushManager'

@Injectable()
export class PushService {
  private static adapterTransports: { [key: string]: any }
  private static options: PushOptions
  private static pushManager: PushManager

  constructor(@Inject(map.PUSH_OPTIONS) options: PushOptions) {
    PushService.options = options
    PushService.adapterTransports = options.adapters
    PushService.pushManager = new PushManager()
  }

  static async getAdapter(adapter: string): Promise<PushAdapter> {
    if (PushService.adapterTransports[adapter]) {
      return PushService.adapterTransports[adapter]
    }

    const pushAdapter = await PushService.newAdapter(adapter)
    PushService.adapterTransports[adapter] = pushAdapter

    return pushAdapter
  }

  static async newAdapter(adapter: string): Promise<PushAdapter> {
    return await PushService.pushManager.getAdapter(adapter, PushService.options.adapters[adapter])
  }
}
