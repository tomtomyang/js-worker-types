declare interface CacheStorage {
  readonly default: Cache;
  open(namespace: string): Promise<Cache>;
}

declare var caches: CacheStorage;

declare interface Cache {
  match(request: string | Request, options?: CacheQueryOptions): Promise<Response | undefined>;
  put(request: string | Request, response: Response): Promise<void>;
  delete(request: string | Request, options?: CacheQueryOptions): Promise<boolean>;
}

declare interface CacheQueryOptions {
  ignoreMethod?: boolean;
}
