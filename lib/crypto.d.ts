declare interface Crypto {
  readonly subtle: SubtleCrypto;
  getRandomValues<T extends ArrayBufferView | null>(array: T): T;
  randomUUID(): `${string}-${string}-${string}-${string}-${string}`;
}

declare var crypto: Crypto;

declare interface CryptoKey {
  readonly algorithm: KeyAlgorithm;
  readonly extractable: boolean;
  readonly type: KeyType;
  readonly usages: KeyUsage[];
}

declare interface CryptoKeyPair {
  privateKey: CryptoKey;
  publicKey: CryptoKey;
}

declare interface SubtleCrypto {
  digest(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>;

  generateKey(
    algorithm: RsaHashedKeyGenParams | EcKeyGenParams,
    extractable: boolean,
    keyUsages: ReadonlyArray<KeyUsage>,
  ): Promise<CryptoKeyPair>;
  generateKey(
    algorithm: AesKeyGenParams | HmacKeyGenParams,
    extractable: boolean,
    keyUsages: ReadonlyArray<KeyUsage>,
  ): Promise<CryptoKey>;
  generateKey(
    algorithm: AlgorithmIdentifier,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKeyPair | CryptoKey>;

  encrypt(
    algorithm: RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
    key: CryptoKey,
    data: BufferSource,
  ): Promise<ArrayBuffer>;

  decrypt(
    algorithm: RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
    key: CryptoKey,
    data: BufferSource,
  ): Promise<ArrayBuffer>;

  sign(
    algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams,
    key: CryptoKey,
    data: BufferSource,
  ): Promise<ArrayBuffer>;

  verify(
    algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams,
    key: CryptoKey,
    signature: BufferSource,
    data: BufferSource,
  ): Promise<boolean>;

  // TODO 暂不支持 jwk
  // importKey(format: "jwk", keyData: JsonWebKey, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKey>;
  importKey(
    format: Exclude<KeyFormat, 'jwk'>,
    keyData: BufferSource,
    algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>;

  // TODO 暂不支持 jwk
  // exportKey(format: "jwk", key: CryptoKey): Promise<JsonWebKey>;
  exportKey(format: Exclude<KeyFormat, 'jwk'>, key: CryptoKey): Promise<ArrayBuffer>;

  deriveKey(
    algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params,
    baseKey: CryptoKey,
    derivedKeyType: AlgorithmIdentifier | AesDerivedKeyParams | HmacImportParams | HkdfParams | Pbkdf2Params,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>;
  deriveBits(
    algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params,
    baseKey: CryptoKey,
    length: number,
  ): Promise<ArrayBuffer>;

  // TODO 暂不支持 jwk
  wrapKey(
    format: Exclude<KeyFormat, 'jwk'>,
    key: CryptoKey,
    wrappingKey: CryptoKey,
    wrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
  ): Promise<ArrayBuffer>;

  // TODO 暂不支持 jwk
  unwrapKey(
    format: Exclude<KeyFormat, 'jwk'>,
    wrappedKey: BufferSource,
    unwrappingKey: CryptoKey,
    unwrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
    unwrappedKeyAlgorithm:
      | AlgorithmIdentifier
      | RsaHashedImportParams
      | EcKeyImportParams
      | HmacImportParams
      | AesKeyAlgorithm,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>;
}

declare interface Algorithm {
  name: string;
}

declare interface KeyAlgorithm {
  name: string;
}

declare interface EcKeyGenParams extends Algorithm {
  namedCurve: NamedCurve;
}

declare interface EcKeyImportParams extends Algorithm {
  namedCurve: NamedCurve;
}

declare interface EcdhKeyDeriveParams extends Algorithm {
  public: CryptoKey;
}

declare interface EcdsaParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
}

declare interface RsaHashedImportParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
}

declare interface RsaKeyGenParams extends Algorithm {
  modulusLength: number;
  publicExponent: Uint8Array;
}

declare interface RsaOaepParams extends Algorithm {
  label?: BufferSource;
}

declare interface RsaPssParams extends Algorithm {
  saltLength: number;
}

declare interface AesCbcParams extends Algorithm {
  iv: BufferSource;
}

declare interface AesCtrParams extends Algorithm {
  counter: BufferSource;
  length: number;
}

declare interface AesDerivedKeyParams extends Algorithm {
  length: number;
}

declare interface AesGcmParams extends Algorithm {
  additionalData?: BufferSource;
  iv: BufferSource;
  tagLength?: number;
}

declare interface AesKeyAlgorithm extends KeyAlgorithm {
  length: number;
}

declare interface AesKeyGenParams extends Algorithm {
  length: number;
}

declare interface HkdfParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
  info: BufferSource;
  salt: BufferSource;
}

declare interface HmacImportParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
  length?: number;
}

declare interface HmacKeyGenParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
  length?: number;
}

declare interface RsaHashedKeyGenParams extends RsaKeyGenParams {
  hash: HashAlgorithmIdentifier;
}

declare interface Pbkdf2Params extends Algorithm {
  hash: HashAlgorithmIdentifier;
  iterations: number;
  salt: BufferSource;
}

type AlgorithmIdentifier = Algorithm | string;
type HashAlgorithmIdentifier = AlgorithmIdentifier;
type KeyFormat = 'jwk' | 'pkcs8' | 'raw' | 'spki';
type KeyType = 'private' | 'public' | 'secret';
type KeyUsage = 'decrypt' | 'deriveBits' | 'deriveKey' | 'encrypt' | 'sign' | 'unwrapKey' | 'verify' | 'wrapKey';
type NamedCurve = string;
