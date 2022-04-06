import { PushAdapter } from './pushAdapter'

export abstract class AbstractPushAdapter implements PushAdapter {
  constructor(protected adapter: string, protected config?: Record<string, any>) {}

  public getConfig(): Record<string, any> | any {
    return this.config
  }

  abstract notify(deviceId: string, notification: any, options?: any): Promise<Record<string, any>>
  abstract getClient(): any
}
