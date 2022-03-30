import { Logger } from '@nestjs/common'

const MISSING_REQUIRED_DEPENDENCY = (transport: string) =>
  `No adapter (${transport}) has been selected. There are no default adapters, please check documentation for supported transports.`

const logger = new Logger('PackageLoader')

export function loadAdapter(transport: string, loaderFn?: Function) {
  try {
    return loaderFn ? loaderFn() : new Error()
  } catch (e) {
    logger.error(MISSING_REQUIRED_DEPENDENCY(transport))
    process.exit(1)
  }
}
