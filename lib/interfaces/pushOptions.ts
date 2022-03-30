import { ModuleMetadata, Type } from '@nestjs/common/interfaces'

export interface AdapterOptions {
  adapter: string
}

export interface PushOptions {
  default?: string
  adapters: Record<string, AdapterOptions>
}

export interface PushOptionsFactory {
  createPushOptions(): Promise<PushOptions> | PushOptions
}

export interface PushAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string
  useExisting?: Type<PushOptions>
  useClass?: Type<PushOptions>
  useFactory?: (...args: any[]) => Promise<PushOptions> | PushOptions
  inject?: any[]
}
