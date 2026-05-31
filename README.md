# Keccak256

Keccak-256 for the web

```bash
npm install @hazae41/keccak256
```

[**📦 NPM**](https://www.npmjs.com/package/@hazae41/keccak256)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Usage

### Direct

```tsx
const data = new TextEncoder().encode("Lorem ipsum dolor sit amet.")
const hash = keccak256.digest(data)
```

### Incremental

```tsx
const hasher = new keccak256.Hasher()

hasher.update(crypto.getRandomValues(new Uint8Array(100)))

console.log(hasher.clone().finalize())

hasher.update(crypto.getRandomValues(new Uint8Array(100)))

console.log(hasher.clone().finalize())

hasher.update(crypto.getRandomValues(new Uint8Array(100)))

console.log(hasher.finalize())
```