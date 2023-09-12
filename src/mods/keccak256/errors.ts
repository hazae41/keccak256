export type AnyError =
  | CreateError
  | UpdateError
  | FinalizeError
  | HashError

export class CreateError extends Error {
  readonly #class = CreateError
  readonly name = this.#class.name

  constructor(options?: ErrorOptions) {
    super(`Could not create`, options)
  }

  static from(cause: unknown) {
    return new CreateError({ cause })
  }

}

export class UpdateError extends Error {
  readonly #class = UpdateError
  readonly name = this.#class.name

  constructor(options?: ErrorOptions) {
    super(`Could not update`, options)
  }

  static from(cause: unknown) {
    return new UpdateError({ cause })
  }

}

export class FinalizeError extends Error {
  readonly #class = FinalizeError
  readonly name = this.#class.name

  constructor(options?: ErrorOptions) {
    super(`Could not finalize`, options)
  }

  static from(cause: unknown) {
    return new FinalizeError({ cause })
  }

}

export class HashError extends Error {
  readonly #class = HashError
  readonly name = this.#class.name

  constructor(options?: ErrorOptions) {
    super(`Could not hash`, options)
  }

  static from(cause: unknown) {
    return new HashError({ cause })
  }

}