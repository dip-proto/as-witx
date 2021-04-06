
/*
 * This file was automatically generated by witx-codegen - Do not edit manually.
 */

export type WasiHandle = i32;
export type Char8 = u8;
export type Char32 = u32;
export type WasiPtr<T> = usize;
export type WasiMutPtr<T> = usize;
export type WasiStringBytesPtr = WasiMutPtr<Char8>;

@unmanaged
export class WasiString {
    ptr: WasiStringBytesPtr;
    length: usize;

    constructor(str: string) {
        let wasiString = String.UTF8.encode(str, false);
        // @ts-ignore: cast
        this.ptr = changetype<WasiStringBytesPtr>(wasiString);
        this.length = wasiString.byteLength;
    }

    toString(): string {
        let tmp = new ArrayBuffer(this.length as u32);
        memory.copy(changetype<usize>(tmp), this.ptr, this.length);
        return String.UTF8.decode(tmp);
    }
}

@unmanaged
export class WasiSlice<T> {
    ptr: WasiPtr<T>;
    length: usize;

    constructor(array: ArrayBufferView) {
        // @ts-ignore: cast
        this.ptr = array.dataStart;
        this.length = array.byteLength;
    }
}

@unmanaged
export class WasiMutSlice<T> {
    ptr: WasiMutPtr<T>;
    length: usize;

    constructor(array: ArrayBufferView) {
        // @ts-ignore: cast
        this.ptr = array.dataStart;
        this.length = array.byteLength;
    }
}

/**
 * ---------------------- Module: [proposal_symmetric] ----------------------
 */

/**
 * Error codes.
 */
export type CryptoErrno = u16;

export namespace CryptoErrno {
    export const SUCCESS: CryptoErrno = 0;
    export const GUEST_ERROR: CryptoErrno = 1;
    export const NOT_IMPLEMENTED: CryptoErrno = 2;
    export const UNSUPPORTED_FEATURE: CryptoErrno = 3;
    export const PROHIBITED_OPERATION: CryptoErrno = 4;
    export const UNSUPPORTED_ENCODING: CryptoErrno = 5;
    export const UNSUPPORTED_ALGORITHM: CryptoErrno = 6;
    export const UNSUPPORTED_OPTION: CryptoErrno = 7;
    export const INVALID_KEY: CryptoErrno = 8;
    export const INVALID_LENGTH: CryptoErrno = 9;
    export const VERIFICATION_FAILED: CryptoErrno = 10;
    export const RNG_ERROR: CryptoErrno = 11;
    export const ALGORITHM_FAILURE: CryptoErrno = 12;
    export const INVALID_SIGNATURE: CryptoErrno = 13;
    export const CLOSED: CryptoErrno = 14;
    export const INVALID_HANDLE: CryptoErrno = 15;
    export const OVERFLOW: CryptoErrno = 16;
    export const INTERNAL_ERROR: CryptoErrno = 17;
    export const TOO_MANY_HANDLES: CryptoErrno = 18;
    export const KEY_NOT_SUPPORTED: CryptoErrno = 19;
    export const KEY_REQUIRED: CryptoErrno = 20;
    export const INVALID_TAG: CryptoErrno = 21;
    export const INVALID_OPERATION: CryptoErrno = 22;
    export const NONCE_REQUIRED: CryptoErrno = 23;
    export const INVALID_NONCE: CryptoErrno = 24;
    export const OPTION_NOT_SET: CryptoErrno = 25;
    export const NOT_FOUND: CryptoErrno = 26;
    export const PARAMETERS_MISSING: CryptoErrno = 27;
    export const IN_PROGRESS: CryptoErrno = 28;
    export const INCOMPATIBLE_KEYS: CryptoErrno = 29;
    export const EXPIRED: CryptoErrno = 30;
}

/**
 * Encoding to use for importing or exporting a key pair.
 */
export type KeypairEncoding = u16;

export namespace KeypairEncoding {
    export const RAW: KeypairEncoding = 0;
    export const PKCS_8: KeypairEncoding = 1;
    export const PEM: KeypairEncoding = 2;
    export const LOCAL: KeypairEncoding = 3;
}

/**
 * Encoding to use for importing or exporting a public key.
 */
export type PublickeyEncoding = u16;

export namespace PublickeyEncoding {
    export const RAW: PublickeyEncoding = 0;
    export const PKCS_8: PublickeyEncoding = 1;
    export const PEM: PublickeyEncoding = 2;
    export const SEC: PublickeyEncoding = 3;
    export const COMPRESSED_SEC: PublickeyEncoding = 4;
    export const LOCAL: PublickeyEncoding = 5;
}

/**
 * Encoding to use for importing or exporting a secret key.
 */
export type SecretkeyEncoding = u16;

export namespace SecretkeyEncoding {
    export const RAW: SecretkeyEncoding = 0;
    export const PKCS_8: SecretkeyEncoding = 1;
    export const PEM: SecretkeyEncoding = 2;
    export const SEC: SecretkeyEncoding = 3;
    export const COMPRESSED_SEC: SecretkeyEncoding = 4;
    export const LOCAL: SecretkeyEncoding = 5;
}

/**
 * Encoding to use for importing or exporting a signature.
 */
export type SignatureEncoding = u16;

export namespace SignatureEncoding {
    export const RAW: SignatureEncoding = 0;
    export const DER: SignatureEncoding = 1;
}

/**
 * An algorithm category.
 */
export type AlgorithmType = u16;

export namespace AlgorithmType {
    export const SIGNATURES: AlgorithmType = 0;
    export const SYMMETRIC: AlgorithmType = 1;
    export const KEY_EXCHANGE: AlgorithmType = 2;
}

/**
 * Version of a managed key.
 * 
 * A version can be an arbitrary `u64` integer, with the expection of some reserved values.
 */
export type Version = u64;

/**
 * Size of a value.
 */
export type Size = usize;

/**
 * A UNIX timestamp, in seconds since 01/01/1970.
 */
export type Timestamp = u64;

/**
 * A 64-bit value
 */
export type U64 = u64;

/**
 * Handle for functions returning output whose size may be large or not known in advance.
 * 
 * An `array_output` object contains a host-allocated byte array.
 * 
 * A guest can get the size of that array after a function returns in order to then allocate a buffer of the correct size.
 * In addition, the content of such an object can be consumed by a guest in a streaming fashion.
 * 
 * An `array_output` handle is automatically closed after its full content has been consumed.
 */
export type ArrayOutput = WasiHandle;

/**
 * A set of options.
 * 
 * This type is used to set non-default parameters.
 * 
 * The exact set of allowed options depends on the algorithm being used.
 */
export type Options = WasiHandle;

/**
 * A handle to the optional secrets management facilities offered by a host.
 * 
 * This is used to generate, retrieve and invalidate managed keys.
 */
export type SecretsManager = WasiHandle;

/**
 * A key pair.
 */
export type Keypair = WasiHandle;

/**
 * A state to absorb data to be signed.
 * 
 * After a signature has been computed or verified, the state remains valid for further operations.
 * 
 * A subsequent signature would sign all the data accumulated since the creation of the state object.
 */
export type SignatureState = WasiHandle;

/**
 * A signature.
 */
export type Signature = WasiHandle;

/**
 * A public key, for key exchange and signature verification.
 */
export type Publickey = WasiHandle;

/**
 * A secret key, for key exchange mechanisms.
 */
export type Secretkey = WasiHandle;

/**
 * A state to absorb signed data to be verified.
 */
export type SignatureVerificationState = WasiHandle;

/**
 * A state to perform symmetric operations.
 * 
 * The state is not reset nor invalidated after an option has been performed.
 * Incremental updates and sessions are thus supported.
 */
export type SymmetricState = WasiHandle;

/**
 * A symmetric key.
 * 
 * The key can be imported from raw bytes, or can be a reference to a managed key.
 * 
 * If it was imported, the host will wipe it from memory as soon as the handle is closed.
 */
export type SymmetricKey = WasiHandle;

/**
 * An authentication tag.
 * 
 * This is an object returned by functions computing authentication tags.
 * 
 * A tag can be compared against another tag (directly supplied as raw bytes) in constant time with the `symmetric_tag_verify()` function.
 * 
 * This object type can't be directly created from raw bytes. They are only returned by functions computing MACs.
 * 
 * The host is reponsible for securely wiping them from memory on close.
 */
export type SymmetricTag = WasiHandle;

/**
 * Options index, only required by the Interface Types translation layer.
 */
export type OptOptionsU = u8;

export namespace OptOptionsU {
    export const SOME: OptOptionsU = 0;
    export const NONE: OptOptionsU = 1;
}

/**
 * An optional options set.
 * 
 * This union simulates an `Option<Options>` type to make the `options` parameter of some functions optional.
 */
// @ts-ignore: decorator
@unmanaged
export class OptOptions {
    tag: u8;
    private __pad8_0: u8;
    private __pad16_0: u16;
    private __pad32_0: u32;

    constructor(tag: u8) {
        this.tag = tag;
        memory.fill(changetype<usize>(this) + 4, 0, 4);
    }

    // @ts-ignore: default
    static new<T>(tag: u8, val: T = 0): OptOptions {
        let tu = new OptOptions(tag);
        tu.set(val);
        return tu;
    }

    get<T>(): T {
        // @ts-ignore: cast
        let valBuf = changetype<usize>(this) + 4;
        if (isReference<T>()) {
            return changetype<T>(valBuf);
        } else {
            return load<T>(valBuf);
        }
    }

    // @ts-ignore: default
    set<T>(val: T = 0): void {
        // @ts-ignore: cast
        let valBuf = changetype<usize>(this) + 4;
        memory.fill(valBuf, 0, 4);
        if (isReference<T>()) {
            (val !== null) && memory.copy(valBuf, changetype<usize>(val), offsetof<T>());
        } else {
            store<T>(valBuf, val)
        }
    }

    // --- some: Options if tag=0

    static some(val: Options): OptOptions {
        return OptOptions.new(0, val);
    }

    setSome(val: Options): void {
        this.tag = 0;
        this.set(val);
    }

    isSome(): bool {
        return this.tag === 0;
    }

    getSome(): Options {
        return this.get<Options>();
    }

    // --- none: (no associated content) if tag=1

    static none(): OptOptions {
        return OptOptions.new(1);
    }

    setNone(): void {
        this.tag = 1;
    }

    isNone(): bool {
        return this.tag === 1;
    }
}


/**
 * Symmetric key index, only required by the Interface Types translation layer.
 */
export type OptSymmetricKeyU = u8;

export namespace OptSymmetricKeyU {
    export const SOME: OptSymmetricKeyU = 0;
    export const NONE: OptSymmetricKeyU = 1;
}

/**
 * An optional symmetric key.
 * 
 * This union simulates an `Option<SymmetricKey>` type to make the `symmetric_key` parameter of some functions optional.
 */
// @ts-ignore: decorator
@unmanaged
export class OptSymmetricKey {
    tag: u8;
    private __pad8_0: u8;
    private __pad16_0: u16;
    private __pad32_0: u32;

    constructor(tag: u8) {
        this.tag = tag;
        memory.fill(changetype<usize>(this) + 4, 0, 4);
    }

    // @ts-ignore: default
    static new<T>(tag: u8, val: T = 0): OptSymmetricKey {
        let tu = new OptSymmetricKey(tag);
        tu.set(val);
        return tu;
    }

    get<T>(): T {
        // @ts-ignore: cast
        let valBuf = changetype<usize>(this) + 4;
        if (isReference<T>()) {
            return changetype<T>(valBuf);
        } else {
            return load<T>(valBuf);
        }
    }

    // @ts-ignore: default
    set<T>(val: T = 0): void {
        // @ts-ignore: cast
        let valBuf = changetype<usize>(this) + 4;
        memory.fill(valBuf, 0, 4);
        if (isReference<T>()) {
            (val !== null) && memory.copy(valBuf, changetype<usize>(val), offsetof<T>());
        } else {
            store<T>(valBuf, val)
        }
    }

    // --- some: SymmetricKey if tag=0

    static some(val: SymmetricKey): OptSymmetricKey {
        return OptSymmetricKey.new(0, val);
    }

    setSome(val: SymmetricKey): void {
        this.tag = 0;
        this.set(val);
    }

    isSome(): bool {
        return this.tag === 0;
    }

    getSome(): SymmetricKey {
        return this.get<SymmetricKey>();
    }

    // --- none: (no associated content) if tag=1

    static none(): OptSymmetricKey {
        return OptSymmetricKey.new(1);
    }

    setNone(): void {
        this.tag = 1;
    }

    isNone(): bool {
        return this.tag === 1;
    }
}


/**
 * Generate a new symmetric key for a given algorithm.
 * 
 * `options` can be `None` to use the default parameters, or an algoritm-specific set of parameters to override.
 * 
 * This function may return `unsupported_feature` if key generation is not supported by the host for the chosen algorithm, or `unsupported_algorithm` if the algorithm is not supported by the host.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_key_generate")
export declare function symmetricKeyGenerate(
    algorithm_ptr: WasiMutPtr<Char8>,
    algorithm_len: usize,
    options: OptOptions,
    result_ptr: WasiMutPtr<SymmetricKey>
): CryptoErrno;

/**
 * Create a symmetric key from raw material.
 * 
 * The algorithm is internally stored along with the key, and trying to use the key with an operation expecting a different algorithm will return `invalid_key`.
 * 
 * The function may also return `unsupported_algorithm` if the algorithm is not supported by the host.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_key_import")
export declare function symmetricKeyImport(
    algorithm_ptr: WasiMutPtr<Char8>,
    algorithm_len: usize,
    raw: WasiPtr<u8>,
    raw_len: Size,
    result_ptr: WasiMutPtr<SymmetricKey>
): CryptoErrno;

/**
 * Export a symmetric key as raw material.
 * 
 * This is mainly useful to export a managed key.
 * 
 * May return `prohibited_operation` if this operation is denied.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_key_export")
export declare function symmetricKeyExport(
    symmetric_key: SymmetricKey,
    result_ptr: WasiMutPtr<ArrayOutput>
): CryptoErrno;

/**
 * Destroy a symmetric key.
 * 
 * Objects are reference counted. It is safe to close an object immediately after the last function needing it is called.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_key_close")
export declare function symmetricKeyClose(
    symmetric_key: SymmetricKey
): CryptoErrno;

/**
 * __(optional)__
 * Generate a new managed symmetric key.
 * 
 * The key is generated and stored by the secrets management facilities.
 * 
 * It may be used through its identifier, but the host may not allow it to be exported.
 * 
 * The function returns the `unsupported_feature` error code if secrets management facilities are not supported by the host,
 * or `unsupported_algorithm` if a key cannot be created for the chosen algorithm.
 * 
 * The function may also return `unsupported_algorithm` if the algorithm is not supported by the host.
 * 
 * This is also an optional import, meaning that the function may not even exist.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_key_generate_managed")
export declare function symmetricKeyGenerateManaged(
    secrets_manager: SecretsManager,
    algorithm_ptr: WasiMutPtr<Char8>,
    algorithm_len: usize,
    options: OptOptions,
    result_ptr: WasiMutPtr<SymmetricKey>
): CryptoErrno;

/**
 * __(optional)__
 * Store a symmetric key into the secrets manager.
 * 
 * On success, the function stores the key identifier into `$symmetric_key_id`,
 * into which up to `$symmetric_key_id_max_len` can be written.
 * 
 * The function returns `overflow` if the supplied buffer is too small.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_key_store_managed")
export declare function symmetricKeyStoreManaged(
    secrets_manager: SecretsManager,
    symmetric_key: SymmetricKey,
    symmetric_key_id: WasiMutPtr<u8>,
    symmetric_key_id_max_len: Size
): CryptoErrno;

/**
 * __(optional)__
 * Replace a managed symmetric key.
 * 
 * This function crates a new version of a managed symmetric key, by replacing `$kp_old` with `$kp_new`.
 * 
 * It does several things:
 * 
 * - The key identifier for `$symmetric_key_new` is set to the one of `$symmetric_key_old`.
 * - A new, unique version identifier is assigned to `$kp_new`. This version will be equivalent to using `$version_latest` until the key is replaced.
 * - The `$symmetric_key_old` handle is closed.
 * 
 * Both keys must share the same algorithm and have compatible parameters. If this is not the case, `incompatible_keys` is returned.
 * 
 * The function may also return the `unsupported_feature` error code if secrets management facilities are not supported by the host,
 * or if keys cannot be rotated.
 * 
 * Finally, `prohibited_operation` can be returned if `$symmetric_key_new` wasn't created by the secrets manager, and the secrets manager prohibits imported keys.
 * 
 * If the operation succeeded, the new version is returned.
 * 
 * This is an optional import, meaning that the function may not even exist.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_key_replace_managed")
export declare function symmetricKeyReplaceManaged(
    secrets_manager: SecretsManager,
    symmetric_key_old: SymmetricKey,
    symmetric_key_new: SymmetricKey,
    result_ptr: WasiMutPtr<Version>
): CryptoErrno;

/**
 * __(optional)__
 * Return the key identifier and version of a managed symmetric key.
 * 
 * If the key is not managed, `unsupported_feature` is returned instead.
 * 
 * This is an optional import, meaning that the function may not even exist.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_key_id")
export declare function symmetricKeyId(
    symmetric_key: SymmetricKey,
    symmetric_key_id: WasiMutPtr<u8>,
    symmetric_key_id_max_len: Size,
    result_0_ptr: WasiMutPtr<Size>,
    result_1_ptr: WasiMutPtr<Version>
): CryptoErrno;

/**
 * __(optional)__
 * Return a managed symmetric key from a key identifier.
 * 
 * `kp_version` can be set to `version_latest` to retrieve the most recent version of a symmetric key.
 * 
 * If no key matching the provided information is found, `not_found` is returned instead.
 * 
 * This is an optional import, meaning that the function may not even exist.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_key_from_id")
export declare function symmetricKeyFromId(
    secrets_manager: SecretsManager,
    symmetric_key_id: WasiPtr<u8>,
    symmetric_key_id_len: Size,
    symmetric_key_version: Version,
    result_ptr: WasiMutPtr<SymmetricKey>
): CryptoErrno;

/**
 * Create a new state to aborb and produce data using symmetric operations.
 * 
 * The state remains valid after every operation in order to support incremental updates.
 * 
 * The function has two optional parameters: a key and an options set.
 * 
 * It will fail with a `key_not_supported` error code if a key was provided but the chosen algorithm doesn't natively support keying.
 * 
 * On the other hand, if a key is required, but was not provided, a `key_required` error will be thrown.
 * 
 * Some algorithms may require additional parameters. They have to be supplied as an options set:
 * 
 * ```rust
 * let options_handle = ctx.options_open()?;
 * ctx.options_set("context", b"My application")?;
 * ctx.options_set_u64("fanout", 16)?;
 * let state_handle = ctx.symmetric_state_open("BLAKE2b-512", None, Some(options_handle))?;
 * ```
 * 
 * If some parameters are mandatory but were not set, the `parameters_missing` error code will be returned.
 * 
 * A notable exception is the `nonce` parameter, that is common to most AEAD constructions.
 * 
 * If a nonce is required but was not supplied:
 * 
 * - If it is safe to do so, the host will automatically generate a nonce. This is true for nonces that are large enough to be randomly generated, or if the host is able to maintain a global counter.
 * - If not, the function will fail and return the dedicated `nonce_required` error code.
 * 
 * A nonce that was automatically generated can be retrieved after the function returns with `symmetric_state_get(state_handle, "nonce")`.
 * 
 * **Sample usage patterns:**
 * 
 * - **Hashing**
 * 
 * ```rust
 * let mut out = [0u8; 64];
 * let state_handle = ctx.symmetric_state_open("SHAKE-128", None, None)?;
 * ctx.symmetric_state_absorb(state_handle, b"data")?;
 * ctx.symmetric_state_absorb(state_handle, b"more_data")?;
 * ctx.symmetric_state_squeeze(state_handle, &mut out)?;
 * ```
 * 
 * - **MAC**
 * 
 * ```rust
 * let mut raw_tag = [0u8; 64];
 * let key_handle = ctx.symmetric_key_import("HMAC/SHA-512", b"key")?;
 * let state_handle = ctx.symmetric_state_open("HMAC/SHA-512", Some(key_handle), None)?;
 * ctx.symmetric_state_absorb(state_handle, b"data")?;
 * ctx.symmetric_state_absorb(state_handle, b"more_data")?;
 * let computed_tag_handle = ctx.symmetric_state_squeeze_tag(state_handle)?;
 * ctx.symmetric_tag_pull(computed_tag_handle, &mut raw_tag)?;
 * ```
 * 
 * Verification:
 * 
 * ```rust
 * let state_handle = ctx.symmetric_state_open("HMAC/SHA-512", Some(key_handle), None)?;
 * ctx.symmetric_state_absorb(state_handle, b"data")?;
 * ctx.symmetric_state_absorb(state_handle, b"more_data")?;
 * let computed_tag_handle = ctx.symmetric_state_squeeze_tag(state_handle)?;
 * ctx.symmetric_tag_verify(computed_tag_handle, expected_raw_tag)?;
 * ```
 * 
 * - **Tuple hashing**
 * 
 * ```rust
 * let mut out = [0u8; 64];
 * let state_handle = ctx.symmetric_state_open("TupleHashXOF256", None, None)?;
 * ctx.symmetric_state_absorb(state_handle, b"value 1")?;
 * ctx.symmetric_state_absorb(state_handle, b"value 2")?;
 * ctx.symmetric_state_absorb(state_handle, b"value 3")?;
 * ctx.symmetric_state_squeeze(state_handle, &mut out)?;
 * ```
 * Unlike MACs and regular hash functions, inputs are domain separated instead of being concatenated.
 * 
 * - **Key derivation using extract-and-expand**
 * 
 * Extract:
 * 
 * ```rust
 * let mut prk = vec![0u8; 64];
 * let key_handle = ctx.symmetric_key_import("HKDF-EXTRACT/SHA-512", b"key")?;
 * let state_handle = ctx.symmetric_state_open("HKDF-EXTRACT/SHA-512", Some(key_handle), None)?;
 * ctx.symmetric_state_absorb(state_handle, b"salt")?;
 * let prk_handle = ctx.symmetric_state_squeeze_key(state_handle, "HKDF-EXPAND/SHA-512")?;
 * ```
 * 
 * Expand:
 * 
 * ```rust
 * let mut subkey = vec![0u8; 32];
 * let state_handle = ctx.symmetric_state_open("HKDF-EXPAND/SHA-512", Some(prk_handle), None)?;
 * ctx.symmetric_state_absorb(state_handle, b"info")?;
 * ctx.symmetric_state_squeeze(state_handle, &mut subkey)?;
 * ```
 * 
 * - **Key derivation using a XOF**
 * 
 * ```rust
 * let mut subkey1 = vec![0u8; 32];
 * let mut subkey2 = vec![0u8; 32];
 * let key_handle = ctx.symmetric_key_import("BLAKE3", b"key")?;
 * let state_handle = ctx.symmetric_state_open("BLAKE3", Some(key_handle), None)?;
 * ctx.symmetric_absorb(state_handle, b"context")?;
 * ctx.squeeze(state_handle, &mut subkey1)?;
 * ctx.squeeze(state_handle, &mut subkey2)?;
 * ```
 * 
 * - **Password hashing**
 * 
 * ```rust
 * let mut memory = vec![0u8; 1_000_000_000];
 * let options_handle = ctx.symmetric_options_open()?;
 * ctx.symmetric_options_set_guest_buffer(options_handle, "memory", &mut memory)?;
 * ctx.symmetric_options_set_u64(options_handle, "opslimit", 5)?;
 * ctx.symmetric_options_set_u64(options_handle, "parallelism", 8)?;
 * 
 * let state_handle = ctx.symmetric_state_open("ARGON2-ID-13", None, Some(options))?;
 * ctx.symmtric_state_absorb(state_handle, b"password")?;
 * 
 * let pw_str_handle = ctx.symmetric_state_squeeze_tag(state_handle)?;
 * let mut pw_str = vec![0u8; ctx.symmetric_tag_len(pw_str_handle)?];
 * ctx.symmetric_tag_pull(pw_str_handle, &mut pw_str)?;
 * ```
 * 
 * - **AEAD encryption with an explicit nonce**
 * 
 * ```rust
 * let key_handle = ctx.symmetric_key_generate("AES-256-GCM", None)?;
 * let message = b"test";
 * 
 * let options_handle = ctx.symmetric_options_open()?;
 * ctx.symmetric_options_set(options_handle, "nonce", nonce)?;
 * 
 * let state_handle = ctx.symmetric_state_open("AES-256-GCM", Some(key_handle), Some(options_handle))?;
 * let mut ciphertext = vec![0u8; message.len() + ctx.symmetric_state_max_tag_len(state_handle)?];
 * ctx.symmetric_state_absorb(state_handle, "additional data")?;
 * ctx.symmetric_state_encrypt(state_handle, &mut ciphertext, message)?;
 * ```
 * 
 * - **AEAD encryption with automatic nonce generation**
 * 
 * ```rust
 * let key_handle = ctx.symmetric_key_generate("AES-256-GCM-SIV", None)?;
 * let message = b"test";
 * let mut nonce = [0u8; 24];
 * 
 * let state_handle = ctx.symmetric_state_open("AES-256-GCM-SIV", Some(key_handle), None)?;
 * 
 * let nonce_handle = ctx.symmetric_state_options_get(state_handle, "nonce")?;
 * ctx.array_output_pull(nonce_handle, &mut nonce)?;
 * 
 * let mut ciphertext = vec![0u8; message.len() + ctx.symmetric_state_max_tag_len(state_handle)?];
 * ctx.symmetric_state_absorb(state_handle, "additional data")?;
 * ctx.symmetric_state_encrypt(state_handle, &mut ciphertext, message)?;
 * ```
 * 
 * - **Session authenticated modes**
 * 
 * ```rust
 * let mut out = [0u8; 16];
 * let mut out2 = [0u8; 16];
 * let mut ciphertext = [0u8; 20];
 * let key_handle = ctx.symmetric_key_generate("Xoodyak-128", None)?;
 * let state_handle = ctx.symmetric_state_open("Xoodyak-128", Some(key_handle), None)?;
 * ctx.symmetric_state_absorb(state_handle, b"data")?;
 * ctx.symmetric_state_encrypt(state_handle, &mut ciphertext, b"abcd")?;
 * ctx.symmetric_state_absorb(state_handle, b"more data")?;
 * ctx.symmetric_state_squeeze(state_handle, &mut out)?;
 * ctx.symmetric_state_squeeze(state_handle, &mut out2)?;
 * ctx.symmetric_state_ratchet(state_handle)?;
 * ctx.symmetric_state_absorb(state_handle, b"more data")?;
 * let next_key_handle = ctx.symmetric_state_squeeze_key(state_handle, "Xoodyak-128")?;
 * // ...
 * ```
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_open")
export declare function symmetricStateOpen(
    algorithm_ptr: WasiMutPtr<Char8>,
    algorithm_len: usize,
    key: OptSymmetricKey,
    options: OptOptions,
    result_ptr: WasiMutPtr<SymmetricState>
): CryptoErrno;

/**
 * Retrieve a parameter from the current state.
 * 
 * In particular, `symmetric_state_options_get("nonce")` can be used to get a nonce that as automatically generated.
 * 
 * The function may return `options_not_set` if an option was not set, which is different from an empty value.
 * 
 * It may also return `unsupported_option` if the option doesn't exist for the chosen algorithm.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_options_get")
export declare function symmetricStateOptionsGet(
    handle: SymmetricState,
    name_ptr: WasiMutPtr<Char8>,
    name_len: usize,
    value: WasiMutPtr<u8>,
    value_max_len: Size,
    result_ptr: WasiMutPtr<Size>
): CryptoErrno;

/**
 * Retrieve an integer parameter from the current state.
 * 
 * In particular, `symmetric_state_options_get("nonce")` can be used to get a nonce that as automatically generated.
 * 
 * The function may return `options_not_set` if an option was not set.
 * 
 * It may also return `unsupported_option` if the option doesn't exist for the chosen algorithm.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_options_get_u64")
export declare function symmetricStateOptionsGetU64(
    handle: SymmetricState,
    name_ptr: WasiMutPtr<Char8>,
    name_len: usize,
    result_ptr: WasiMutPtr<U64>
): CryptoErrno;

/**
 * Destroy a symmetric state.
 * 
 * Objects are reference counted. It is safe to close an object immediately after the last function needing it is called.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_close")
export declare function symmetricStateClose(
    handle: SymmetricState
): CryptoErrno;

/**
 * Absorb data into the state.
 * 
 * - **Hash functions:** adds data to be hashed.
 * - **MAC functions:** adds data to be authenticated.
 * - **Tuplehash-like constructions:** adds a new tuple to the state.
 * - **Key derivation functions:** adds to the IKM or to the subkey information.
 * - **AEAD constructions:** adds additional data to be authenticated.
 * - **Stateful hash objects, permutation-based constructions:** absorbs.
 * 
 * If the chosen algorithm doesn't accept input data, the `invalid_operation` error code is returned.
 * 
 * If too much data has been fed for the algorithm, `overflow` may be thrown.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_absorb")
export declare function symmetricStateAbsorb(
    handle: SymmetricState,
    data: WasiPtr<u8>,
    data_len: Size
): CryptoErrno;

/**
 * Squeeze bytes from the state.
 * 
 * - **Hash functions:** this tries to output an `out_len` bytes digest from the absorbed data. The hash function output will be truncated if necessary. If the requested size is too large, the `invalid_len` error code is returned.
 * - **Key derivation functions:** : outputs an arbitrary-long derived key.
 * - **RNGs, DRBGs, stream ciphers:**: outputs arbitrary-long data.
 * - **Stateful hash objects, permutation-based constructions:** squeeze.
 * 
 * Other kinds of algorithms may return `invalid_operation` instead.
 * 
 * For password-stretching functions, the function may return `in_progress`.
 * In that case, the guest should retry with the same parameters until the function completes.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_squeeze")
export declare function symmetricStateSqueeze(
    handle: SymmetricState,
    out: WasiMutPtr<u8>,
    out_len: Size
): CryptoErrno;

/**
 * Compute and return a tag for all the data injected into the state so far.
 * 
 * - **MAC functions**: returns a tag authenticating the absorbed data.
 * - **Tuplehash-like constructions:** returns a tag authenticating all the absorbed tuples.
 * - **Password-hashing functions:** returns a standard string containing all the required parameters for password verification.
 * 
 * Other kinds of algorithms may return `invalid_operation` instead.
 * 
 * For password-stretching functions, the function may return `in_progress`.
 * In that case, the guest should retry with the same parameters until the function completes.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_squeeze_tag")
export declare function symmetricStateSqueezeTag(
    handle: SymmetricState,
    result_ptr: WasiMutPtr<SymmetricTag>
): CryptoErrno;

/**
 * Use the current state to produce a key for a target algorithm.
 * 
 * For extract-then-expand constructions, this returns the PRK.
 * For session-base authentication encryption, this returns a key that can be used to resume a session without storing a nonce.
 * 
 * `invalid_operation` is returned for algorithms not supporting this operation.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_squeeze_key")
export declare function symmetricStateSqueezeKey(
    handle: SymmetricState,
    alg_str_ptr: WasiMutPtr<Char8>,
    alg_str_len: usize,
    result_ptr: WasiMutPtr<SymmetricKey>
): CryptoErrno;

/**
 * Return the maximum length of an authentication tag for the current algorithm.
 * 
 * This allows guests to compute the size required to store a ciphertext along with its authentication tag.
 * 
 * The returned length may include the encryption mode's padding requirements in addition to the actual tag.
 * 
 * For an encryption operation, the size of the output buffer should be `input_len + symmetric_state_max_tag_len()`.
 * 
 * For a decryption operation, the size of the buffer that will store the decrypted data must be `ciphertext_len - symmetric_state_max_tag_len()`.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_max_tag_len")
export declare function symmetricStateMaxTagLen(
    handle: SymmetricState,
    result_ptr: WasiMutPtr<Size>
): CryptoErrno;

/**
 * Encrypt data with an attached tag.
 * 
 * - **Stream cipher:** adds the input to the stream cipher output. `out_len` and `data_len` can be equal, as no authentication tags will be added.
 * - **AEAD:** encrypts `data` into `out`, including the authentication tag to the output. Additional data must have been previously absorbed using `symmetric_state_absorb()`. The `symmetric_state_max_tag_len()` function can be used to retrieve the overhead of adding the tag, as well as padding if necessary.
 * - **SHOE, Xoodyak, Strobe:** encrypts data, squeezes a tag and appends it to the output.
 * 
 * If `out` and `data` are the same address, encryption may happen in-place.
 * 
 * The function returns the actual size of the ciphertext along with the tag.
 * 
 * `invalid_operation` is returned for algorithms not supporting encryption.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_encrypt")
export declare function symmetricStateEncrypt(
    handle: SymmetricState,
    out: WasiMutPtr<u8>,
    out_len: Size,
    data: WasiPtr<u8>,
    data_len: Size,
    result_ptr: WasiMutPtr<Size>
): CryptoErrno;

/**
 * Encrypt data, with a detached tag.
 * 
 * - **Stream cipher:** returns `invalid_operation` since stream ciphers do not include authentication tags.
 * - **AEAD:** encrypts `data` into `out` and returns the tag separately. Additional data must have been previously absorbed using `symmetric_state_absorb()`. The output and input buffers must be of the same length.
 * - **SHOE, Xoodyak, Strobe:** encrypts data and squeezes a tag.
 * 
 * If `out` and `data` are the same address, encryption may happen in-place.
 * 
 * The function returns the tag.
 * 
 * `invalid_operation` is returned for algorithms not supporting encryption.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_encrypt_detached")
export declare function symmetricStateEncryptDetached(
    handle: SymmetricState,
    out: WasiMutPtr<u8>,
    out_len: Size,
    data: WasiPtr<u8>,
    data_len: Size,
    result_ptr: WasiMutPtr<SymmetricTag>
): CryptoErrno;

/**
 * - **Stream cipher:** adds the input to the stream cipher output. `out_len` and `data_len` can be equal, as no authentication tags will be added.
 * - **AEAD:** decrypts `data` into `out`. Additional data must have been previously absorbed using `symmetric_state_absorb()`.
 * - **SHOE, Xoodyak, Strobe:** decrypts data, squeezes a tag and verify that it matches the one that was appended to the ciphertext.
 * 
 * If `out` and `data` are the same address, decryption may happen in-place.
 * 
 * `out_len` must be exactly `data_len` + `max_tag_len` bytes.
 * 
 * The function returns the actual size of the decrypted message, which can be smaller than `out_len` for modes that requires padding.
 * 
 * `invalid_tag` is returned if the tag didn't verify.
 * 
 * `invalid_operation` is returned for algorithms not supporting encryption.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_decrypt")
export declare function symmetricStateDecrypt(
    handle: SymmetricState,
    out: WasiMutPtr<u8>,
    out_len: Size,
    data: WasiPtr<u8>,
    data_len: Size,
    result_ptr: WasiMutPtr<Size>
): CryptoErrno;

/**
 * - **Stream cipher:** returns `invalid_operation` since stream ciphers do not include authentication tags.
 * - **AEAD:** decrypts `data` into `out`. Additional data must have been previously absorbed using `symmetric_state_absorb()`.
 * - **SHOE, Xoodyak, Strobe:** decrypts data, squeezes a tag and verify that it matches the expected one.
 * 
 * `raw_tag` is the expected tag, as raw bytes.
 * 
 * `out` and `data` be must have the same length.
 * If they also share the same address, decryption may happen in-place.
 * 
 * The function returns the actual size of the decrypted message.
 * 
 * `invalid_tag` is returned if the tag verification failed.
 * 
 * `invalid_operation` is returned for algorithms not supporting encryption.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_decrypt_detached")
export declare function symmetricStateDecryptDetached(
    handle: SymmetricState,
    out: WasiMutPtr<u8>,
    out_len: Size,
    data: WasiPtr<u8>,
    data_len: Size,
    raw_tag: WasiPtr<u8>,
    raw_tag_len: Size,
    result_ptr: WasiMutPtr<Size>
): CryptoErrno;

/**
 * Make it impossible to recover the previous state.
 * 
 * This operation is supported by some systems keeping a rolling state over an entire session, for forward security.
 * 
 * `invalid_operation` is returned for algorithms not supporting ratcheting.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_state_ratchet")
export declare function symmetricStateRatchet(
    handle: SymmetricState
): CryptoErrno;

/**
 * Return the length of an authentication tag.
 * 
 * This function can be used by a guest to allocate the correct buffer size to copy a computed authentication tag.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_tag_len")
export declare function symmetricTagLen(
    symmetric_tag: SymmetricTag,
    result_ptr: WasiMutPtr<Size>
): CryptoErrno;

/**
 * Copy an authentication tag into a guest-allocated buffer.
 * 
 * The handle automatically becomes invalid after this operation. Manually closing it is not required.
 * 
 * Example usage:
 * 
 * ```rust
 * let mut raw_tag = [0u8; 16];
 * ctx.symmetric_tag_pull(raw_tag_handle, &mut raw_tag)?;
 * ```
 * 
 * The function returns `overflow` if the supplied buffer is too small to copy the tag.
 * 
 * Otherwise, it returns the number of bytes that have been copied.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_tag_pull")
export declare function symmetricTagPull(
    symmetric_tag: SymmetricTag,
    buf: WasiMutPtr<u8>,
    buf_len: Size,
    result_ptr: WasiMutPtr<Size>
): CryptoErrno;

/**
 * Verify that a computed authentication tag matches the expected value, in constant-time.
 * 
 * The expected tag must be provided as a raw byte string.
 * 
 * The function returns `invalid_tag` if the tags don't match.
 * 
 * Example usage:
 * 
 * ```rust
 * let key_handle = ctx.symmetric_key_import("HMAC/SHA-256", b"key")?;
 * let state_handle = ctx.symmetric_state_open("HMAC/SHA-256", Some(key_handle), None)?;
 * ctx.symmetric_state_absorb(state_handle, b"data")?;
 * let computed_tag_handle = ctx.symmetric_state_squeeze_tag(state_handle)?;
 * ctx.symmetric_tag_verify(computed_tag_handle, expected_raw_tag)?;
 * ```
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_tag_verify")
export declare function symmetricTagVerify(
    symmetric_tag: SymmetricTag,
    expected_raw_tag_ptr: WasiPtr<u8>,
    expected_raw_tag_len: Size
): CryptoErrno;

/**
 * Explicitly destroy an unused authentication tag.
 * 
 * This is usually not necessary, as `symmetric_tag_pull()` automatically closes a tag after it has been copied.
 * 
 * Objects are reference counted. It is safe to close an object immediately after the last function needing it is called.
 */
// @ts-ignore: decorator
@external("proposal_symmetric", "symmetric_tag_close")
export declare function symmetricTagClose(
    symmetric_tag: SymmetricTag
): CryptoErrno;

