export interface PushAdapter {
  /**
   * Push notification message
   *
   * @param deviceId
   * @param notification
   */
  notify(deviceId: string, notification: any): Promise<Record<string, any>>

  /**
   * Get instance of adapter's client.
   */
  getClient(): any

  /**
   * Get config of the adapter's instance.
   */
  getConfig(): Record<string, any> | any
}
