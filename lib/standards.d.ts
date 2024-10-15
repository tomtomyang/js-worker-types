declare function btoa(data: string | ArrayBuffer | ArrayBufferView): string;
declare function atob(data: string): string;
declare function btoaUTF8(data: string): string;
declare function atobUTF8(data: string): string;

declare interface Blob {
  readonly size: number;
  readonly type: string;

  arrayBuffer(): Promise<ArrayBuffer>;
  slice(start?: number, end?: number, contentType?: string): Blob;
  stream(): ReadableStream<Uint8Array>;
  text(): Promise<string>;
}

declare var Blob: {
  prototype: Blob;
  new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};

declare interface BlobPropertyBag {
  type?: string;
}

type BufferSource = ArrayBufferView | ArrayBuffer;
type BlobPart = BufferSource | Blob | string;

declare interface AbortSignal extends EventTarget {
  readonly aborted: boolean;
  readonly reason: any;
  onabort: ((ev: Event) => any) | null;

  throwIfAborted(): void;
}

declare var AbortSignal: {
  abort(reason?: string): AbortSignal;
};

declare interface AbortSignalEventMap {
  abort: Event;
}

declare interface EventTarget {
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions,
  ): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject | null): void;
  dispatchEvent(event: Event): boolean;
}

type EventListener = (evt: Event) => void;

// declare interface EventListenerObject {
//   handleEvent(object: Event): void;
// }

declare interface EventListenerOptions {
  once?: boolean;
  signal?: AbortSignal;
}

declare interface Event {
  readonly type: string;
  stopImmediatePropagation(): void;
}

declare interface AbortController {
  readonly signal: AbortSignal;
  abort(reason?: any): void;
}

declare var AbortController: {
  prototype: AbortController;
  new (): AbortController;
};

// type EventListenerOrEventListenerObject = EventListener | EventListenerObject;
type EventListenerOrEventListenerObject = EventListener;

declare interface Console {
  log(...data: any[]): void;
  debug(...data: any[]): void;
  info(...data: any[]): void;
  notice(...data: any[]): void;
  warn(...data: any[]): void;
  error(...data: any[]): void;
}

declare var console: Console;

declare interface URL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  readonly origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  readonly searchParams: URLSearchParams;
  username: string;
  toString(): string;
  // TODO runtime 不支持
  // toJSON(): string;
}

declare var URL: {
  prototype: URL;
  new (url: string | URL, base?: string | URL): URL;
  // TODO runtime 不支持
  // createObjectURL(obj: Blob): string;
  // revokeObjectURL(url: string): void;
};

declare interface URLSearchParams {
  [Symbol.iterator](): IterableIterator<[string, string]>;
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  getAll(name: string): string[];
  has(name: string): boolean;
  set(name: string, value: string): void;
  sort(): void;
  toString(): string;
  forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
}

declare var URLSearchParams: {
  prototype: URLSearchParams;
  new (init?: string[][] | Record<string, string> | string | URLSearchParams): URLSearchParams;
};

declare interface JSON {
  /**
   * Converts a JavaScript Object Notation (JSON) string into an object.
   * @param text A valid JSON string.
   * @param reviver A function that transforms the results. This function is called for each member of the object.
   * If a member contains nested objects, the nested objects are transformed before the parent object is.
   */
  parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer A function that transforms the results.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   */
  stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   */
  stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
}

/**
 * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
 */
declare var JSON: JSON;

type FormDataEntryValue = string;
declare interface FormData {
  [Symbol.iterator](): IterableIterator<[key: string, value: FormDataEntryValue]>;
  append(name: string, value: string | Blob): void;
  append(name: string, value: string): void;
  append(name: string, blobValue: Blob, filename?: string): void;
  delete(name: string): void;
  get(name: string): FormDataEntryValue | null;
  getAll(name: string): FormDataEntryValue[];
  has(name: string): boolean;
  set(name: string, value: string | Blob): void;
  set(name: string, value: string): void;
  set(name: string, blobValue: Blob, filename?: string): void;
  entries(): IterableIterator<[key: string, value: FormDataEntryValue]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<FormDataEntryValue>;
  forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}

declare var FormData: {
  prototype: FormData;
  new (): FormData;
};
