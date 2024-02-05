export const generateKey = async () =>
  await window.crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-521',
    },
    true,
    ['sign', 'verify']
  );

export const exportKey = async (key) =>
  await window.crypto.subtle.exportKey('jwk', key);

export const importPrivateKey = async (key) =>
  await window.crypto.subtle.importKey(
    'jwk',
    key,
    {
      name: 'ECDSA',
      namedCurve: 'P-521',
    },
    true,
    ['sign']
  );

export const importPublicKey = async (key) =>
  await window.crypto.subtle.importKey(
    'jwk',
    key,
    {
      name: 'ECDSA',
      namedCurve: 'P-521',
    },
    true,
    ['verify']
  );

export const sign = async (data, privateKey) =>
  new Uint8Array(
    await window.crypto.subtle.sign(
      { name: 'ECDSA', hash: { name: 'SHA-512' } },
      privateKey,
      new TextEncoder().encode(data)
    )
  );

export const verify = async (publicKey, signature, data) =>
  await window.crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-512' },
    },
    publicKey,
    signature,
    new TextEncoder().encode(data)
  );
