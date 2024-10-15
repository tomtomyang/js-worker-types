declare function addEventListener(type: 'fetch', listener: (event: FetchEvent) => void): void;
declare function fetch(request: string | Request, init?: RequestInit): Promise<Response>;
declare interface FetchEvent {
  readonly clientId: string;
  readonly request: Request;

  respondWith(response: Response | Promise<Response>): void;
  waitUntil(task: Promise<any>): void;
  passThroughOnException(): void;
}
