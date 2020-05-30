import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as LRUCache from 'lru-cache';

@Injectable()
export class TokenBlacklistService {
  private cache: LRUCache<string, number>;
  constructor(
    private readonly configService: ConfigService  
  ) {
    this.cache = new LRUCache<string, number>({
      max: 10000,
      maxAge: configService.get('security.jwt.expires') * 1000,
    });
  }

  put(token: string) {
    this.cache.set(token, 1);
  }

  isBlocked(token: string) {
    return this.cache.has(token);
  } 
}
