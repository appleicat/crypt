export const generateKey = async () =>
  await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-512',
    },
    true,
    ['encrypt', 'decrypt']
  );

export const exportPublicKey = async (key) =>
  new Uint8Array(await window.crypto.subtle.exportKey('spki', key));

export const exportPrivateKey = async (key) =>
  new Uint8Array(await window.crypto.subtle.exportKey('pkcs8', key));

export const importPublicKey = async (key) =>
  await window.crypto.subtle.importKey(
    'spki',
    key,
    { name: 'RSA-OAEP', hash: 'SHA-512' },
    true,
    ['encrypt']
  );

export const importPrivateKey = async (key) =>
  await window.crypto.subtle.importKey(
    'pkcs8',
    key,
    { name: 'RSA-OAEP', hash: 'SHA-512' },
    true,
    ['decrypt']
  );

export const encrypt = async (data, publicKey) =>
  new Uint8Array(
    await window.crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      new TextEncoder().encode(data)
    )
  );

export const decrypt = async (cipher, pivateKey) =>
  new TextDecoder().decode(
    await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, pivateKey, cipher)
  );
