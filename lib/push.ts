import { Injectable } from '@nestjs/common'
import { PushService } from './service'

@Injectable()
export class Push {
  static adapter(adapter: string) {
    return PushService.getAdapter(adapter)
  }
}
