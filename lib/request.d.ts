declare interface Request extends Body {
  readonly headers: Headers;
  readonly method: string;
  readonly redirect: RequestRedirect;
  readonly url: string;
  readonly version: string;
  readonly maxFollow: number;

  clone(copyHeaders?: boolean): Request;
}

declare var Request: {
  prototype: Request;
  new (input: string | Request, init?: RequestInit): Request;
};

declare interface Response extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly redirected: boolean;
  readonly redirectUrls: string[];

  clone(copyHeaders?: boolean): Response;
}

declare var Response: {
  prototype: Response;
  new (body?: BodyInit | null, init?: ResponseInit): Response;
  // TODO 控制台文档暂无
  // error(): Response;
  redirect(url: string | URL, status?: number): Response;
};

declare interface Body {
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;

  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  formData(): Promise<FormData>;
  json(): Promise<any>;
  text(): Promise<string>;
}

declare interface Headers {
  append(name: string, value: string): void;
  delete(name: string): void;
  entries(): IterableIterator<[string, string]>;
  forEach(callback: (value: string, name: string) => void | number): void;
  get(name: string): string | null;
  has(name: string): boolean;
  keys(): IterableIterator<string>;
  set(name: string, value: string): void;
  values(): IterableIterator<string>;
}

declare var Headers: {
  prototype: Headers;
  new (init?: HeadersInit): Headers;
};
declare interface RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
  version?: string;
  redirect?: RequestRedirect;
  maxFollow?: number;
  copyHeaders?: boolean;
}

type RequestRedirect = 'error' | 'follow' | 'manual';
type HeadersInit = [string, string][] | Record<string, string> | Headers;
type BodyInit = string | Blob | ArrayBuffer | ArrayBufferView | ReadableStream;

declare interface ResponseInit {
  headers?: HeadersInit;
  status?: number;
  statusText?: string;
}
