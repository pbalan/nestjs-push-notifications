import { Injectable } from '@nestjs/common'
import { PushAdapter } from './interfaces/pushAdapter'
import { PushService } from './service'

@Injectable()
export class Push {
  static async adapter(adapter: string): Promise<PushAdapter> {
    return await PushService.getAdapter(adapter)
  }
}
