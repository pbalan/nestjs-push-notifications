import { DynamicModule, Module, Provider, Type } from '@nestjs/common'
import { PUSH_OPTIONS } from './constants'
import { PushAsyncOptions, PushOptions, PushOptionsFactory } from './interfaces'
import { PushService } from './service'

@Module({
  providers: [],
  exports: [],
})
export class PushModule {
  static register(options: PushOptions): DynamicModule {
    return {
      global: true,
      module: PushModule,
      providers: [
        PushService,
        {
          provide: PUSH_OPTIONS,
          useValue: options,
        },
      ],
    }
  }

  static registerAsync(options: PushAsyncOptions): DynamicModule {
    return {
      global: true,
      module: PushModule,
      providers: [this.createPushOptionsProvider(options), PushService],
    }
  }

  private static createPushOptionsProvider(options: PushAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: PUSH_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    const inject = [(options.useClass || options.useExisting) as Type<PushOptions>]
    return {
      provide: PUSH_OPTIONS,
      useFactory: async (optionsFactory: PushOptionsFactory) =>
        await optionsFactory.createPushOptions(),
      inject,
    }
  }
}
