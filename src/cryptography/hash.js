export const hash = async (data, algorithm) =>
  Array.from(
    new Uint8Array(
      await window.crypto.subtle.digest(
        algorithm,
        new TextEncoder().encode(data)
      )
    )
  )
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
