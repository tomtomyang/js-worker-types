declare interface TextEncoder {
  readonly encoding: string;

  encode(input?: string): Uint8Array;
  encodeInto(input: string, destination: Uint8Array): TextEncoderEncodeIntoResult;
}

declare var TextEncoder: {
  prototype: TextEncoder;
  new (): TextEncoder;
};

declare interface TextDecoder {
  readonly encoding: string;
  readonly fatal: boolean;
  readonly ignoreBOM: boolean;

  decode(input?: BufferSource, options?: TextDecodeOptions): string;
}

declare var TextDecoder: {
  prototype: TextDecoder;
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
};

declare interface TextEncoderEncodeIntoResult {
  read?: number;
  written?: number;
}

declare interface TextDecodeOptions {
  stream?: boolean;
}

declare interface TextDecoderOptions {
  fatal?: boolean;
  ignoreBOM?: boolean;
}
