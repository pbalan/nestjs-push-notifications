import { Inject, Injectable } from '@nestjs/common'
import { PUSH_OPTIONS } from './constants'
import { PushAdapter, PushOptions } from './interfaces'
import { PushManager } from './pushManager'

@Injectable()
export class PushService {
  private static adapterTransports: { [key: string]: any }
  private static options: PushOptions
  private static pushManager: PushManager

  constructor(@Inject(PUSH_OPTIONS) options: PushOptions) {
    PushService.options = options
    PushService.adapterTransports = {}
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
