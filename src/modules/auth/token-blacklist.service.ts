import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as LRUCache from 'lru-cache';
import { RedisService } from 'nestjs-redis';
import {
  DEFAULT_CLIENT,
  resolveBlacklistTokenKey,
} from 'src/common/constants/redis';
import { Redis } from 'ioredis';

@Injectable()
export class TokenBlacklistService {
  private cache: LRUCache<string, number>;
  private redisClient: Redis;
  private ttl: number;
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.ttl = configService.get('security.jwt.expires'); // seconds
    this.cache = new LRUCache<string, number>({
      max: 10000,
      maxAge: this.ttl * 1000, // milliseconds
    });
    this.redisClient = this.redisService.getClient(DEFAULT_CLIENT);
  }

  async put(token: string) {
    this.cache.set(token, 1);
    return this.redisClient.setex(resolveBlacklistTokenKey(token), this.ttl, 1);
  }

  async isBlocked(token: string) : Promise<boolean> {
    if (this.cache.has(token)) return true;
    return await this.redisClient.exists(resolveBlacklistTokenKey(token)) > 0;
  }
}
