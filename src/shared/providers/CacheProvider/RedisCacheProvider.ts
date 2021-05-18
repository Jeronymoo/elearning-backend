import cacheConfig from "@config/redis";
import Redis, { Redis as RedisClient } from "ioredis";

import ICacheProvider from "./models/ICacheProvider";

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  private static INSTANCE: RedisCacheProvider;

  private constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public static getInstance(): RedisCacheProvider {
    if (!RedisCacheProvider.INSTANCE) {
      RedisCacheProvider.INSTANCE = new RedisCacheProvider();
    }

    return RedisCacheProvider.INSTANCE;
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }
  public async recover(key: string): Promise<any> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = await JSON.parse(data);

    return parsedData;
  }
  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
