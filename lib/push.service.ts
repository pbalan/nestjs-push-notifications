import { Inject, Injectable } from '@nestjs/common'
import { PushAdapter, PushOptions } from './interfaces'
import { map } from './provider.map'
import { PushManager } from './pushManager'

@Injectable()
export class PushService {
  private static adapters: { [key: string]: any }
  private static options: PushOptions
  private static pushManager: PushManager

  constructor(@Inject(map.PUSH_OPTIONS) options: PushOptions) {
    PushService.options = options
    PushService.adapters = options.adapters
    PushService.pushManager = new PushManager()
  }

  static getAdapter(adapter: string): Promise<PushAdapter> {
    if (PushService.adapters[adapter]) {
      return PushService.adapters[adapter]
    }

    const pushAdapter = PushService.newAdapter(adapter)
    PushService.adapters[adapter] = pushAdapter
    return pushAdapter
  }

  static newAdapter(adapter: string): Promise<PushAdapter> {
    return PushService.pushManager.getAdapter(adapter, PushService.options.adapters[adapter])
  }
}
