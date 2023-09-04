import { Cursor, CursorWriteError } from "@hazae41/cursor"
import { OptionInit } from "@hazae41/option"
import { Ok, Result } from "@hazae41/result"

export const global: OptionInit<Adapter> = {}

export interface Copiable extends Disposable {
  readonly bytes: Uint8Array

  copy(): Uint8Array

  trySize(): Result<number, never>

  tryWrite(cursor: Cursor): Result<void, CursorWriteError>
}

export class Copied implements Copiable {

  /**
   * A copiable that's already copied
   * @param bytes 
   */
  constructor(
    readonly bytes: Uint8Array
  ) { }

  [Symbol.dispose]() { }

  static new(bytes: Uint8Array) {
    return new Copied(bytes)
  }

  static from(buffer: ArrayBuffer) {
    return new Copied(new Uint8Array(buffer))
  }

  copy() {
    return this.bytes
  }

  trySize(): Result<number, never> {
    return new Ok(this.bytes.length)
  }

  tryWrite(cursor: Cursor): Result<void, CursorWriteError> {
    return cursor.tryWrite(this.bytes)
  }

}

export interface Hasher extends Disposable {
  tryUpdate(bytes: Uint8Array): Result<void, Error>
  tryFinalize(): Result<Copiable, Error>
}

export interface HasherFactory {
  tryNew(): Result<Hasher, Error>
}


export interface Adapter {
  readonly Hasher: HasherFactory

  tryHash(bytes: Uint8Array): Result<Copiable, Error>
}

