export const generateKey = async () =>
  await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

export const exportKey = async (key) =>
  new Uint8Array(await window.crypto.subtle.exportKey('raw', key));

export const importKey = async (key) =>
  await window.crypto.subtle.importKey('raw', key, 'AES-GCM', true, [
    'encrypt',
    'decrypt',
  ]);

export const encrypt = async (data, key) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(32));
  const cipher = new Uint8Array(
    await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(data)
    )
  );
  return { cipher, iv };
};

export const decrypt = async ({ cipher, iv }, key) =>
  new TextDecoder().decode(
    await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher)
  );
