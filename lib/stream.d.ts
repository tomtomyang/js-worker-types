declare interface ReadableStream<R = any> {
  readonly locked: boolean;

  getReader(options: { mode: 'byob' }): ReadableStreamBYOBReader;
  getReader(): ReadableStreamDefaultReader;
  getReader(options?: ReadableStreamGetReaderOptions): ReadableStreamReader;
  pipeThrough<T>(transformStream: TransformStream<T, R>, options?: StreamPipeOptions): ReadableStream<T>;
  pipeTo(destination: WritableStream<R>, options?: StreamPipeOptions): Promise<void>;
  tee(): [ReadableStream<R>, ReadableStream<R>];
  cancel(reason?: any): Promise<void>;
}

type ReadableStreamReader = ReadableStreamDefaultReader | ReadableStreamBYOBReader;

declare interface WritableStream<W = any> {
  readonly locked: boolean;
  readonly highWaterMark: number;

  getWriter(): WritableStreamDefaultWriter<W>;
  close(): Promise<void>;
  abort(reason?: string): Promise<string>;
}

declare interface TransformStream<I = any, O = any> {
  readonly readable: ReadableStream<O>;
  readonly writable: WritableStream<I>;
}

declare var TransformStream: {
  prototype: TransformStream;
  new <I = any, O = any>(transformer?: any, writableStrategy?: QueuingStrategy): TransformStream<I, O>;
};

declare interface QueuingStrategy {
  highWaterMark?: number;
}

declare interface ReadableStreamBYOBReader extends ReadableStreamGenericReader {
  read(view: ArrayBufferView): Promise<ReadableStreamReadResult<ArrayBufferView>>;
  releaseLock(): void;
}

declare interface ReadableStreamDefaultReader extends ReadableStreamGenericReader {
  read(): Promise<ReadableStreamReadResult<string | ArrayBuffer | ArrayBufferView>>;
  releaseLock(): void;
}

declare interface ReadableStreamGenericReader {
  readonly closed: Promise<void>;
  cancel(reason?: string): Promise<string>;
}

declare interface ReadableStreamGetReaderOptions {
  mode?: ReadableStreamReaderMode;
}

type ReadableStreamReadResult<T> = ReadableStreamReadValueResult<T> | ReadableStreamReadDoneResult<T>;

declare interface ReadableStreamReadValueResult<T> {
  done: false;
  value: T;
}

declare interface ReadableStreamReadDoneResult<T> {
  done: true;
  value?: T;
}

declare interface ReadableWritablePair<R = any, W = any> {
  readable: ReadableStream<R>;
  writable: WritableStream<W>;
}

declare interface StreamPipeOptions {
  preventAbort?: boolean;
  preventCancel?: boolean;
  preventClose?: boolean;
  signal?: AbortSignal;
}

declare interface WritableStreamDefaultWriter<W = any> {
  readonly closed: Promise<undefined>;
  readonly ready: Promise<undefined>;
  readonly desiredSize: number | null;

  write(chunk?: W): Promise<void>;
  close(): Promise<void>;
  abort(reason?: string): Promise<string>;
  releaseLock(): void;
}

type ReadableStreamReaderMode = 'byob';
