import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  generateKey,
  exportKey,
  importKey,
  encrypt,
  decrypt,
} from '../../cryptography/symmetric';
export default function Page() {
  const [key, setKey] = useState();
  const [displayedKey, setDisplayedKey] = useState('');
  const [iv, setIV] = useState();
  const [displayedIV, setDisplayedIV] = useState('');
  const [data, setData] = useState('');
  return (
    <motion.section
      animate={{ opacity: [0, 1] }}
      className="h-full w-full text-[3vmin]"
    >
      <section className="flex h-full w-full divide-x">
        <aside className="transition hover:bg-white hover:text-black">
          <a
            href="/crypt"
            className="flex flex-col-reverse h-full w-full p-[3vmin] font-thin"
          >
            &larr;
          </a>
        </aside>
        <section className="flex flex-col h-full w-full divide-y flex-auto">
          <header className="p-[3vmin] flex justify-between">
            SYMMETRIC ENCRYPTION
          </header>
          <main className="flex-auto flex h-full w-full justify-between items-center divide-x">
            <section className="h-full w-full flex flex-col divide-y">
              <div className="h-full w-full p-[3vmin]">
                <textarea
                  placeholder="message"
                  className="outline-none bg-transparent h-full w-full resize-none font-['JetBrains_Mono']"
                  value={data}
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
                />
              </div>
              <div className="w-full p-[3vmin]">
                <input
                  placeholder="iv"
                  className="outline-none bg-transparent w-full resize-none font-['JetBrains_Mono']"
                  value={displayedIV}
                  onChange={async (e) => {
                    setDisplayedIV(e.target.value);
                    setIV(
                      new Uint8Array(
                        Array.from(window.atob(e.target.value)).map((c) =>
                          c.charCodeAt()
                        )
                      )
                    );
                  }}
                />
              </div>
              <div className="w-full p-[3vmin]">
                <input
                  placeholder="key"
                  className="outline-none bg-transparent h-full w-full resize-none font-['JetBrains_Mono']"
                  value={displayedKey}
                  onChange={async (e) => {
                    setDisplayedKey(e.target.value);
                    setKey(
                      await importKey(
                        new Uint8Array(
                          Array.from(window.atob(e.target.value)).map((c) =>
                            c.charCodeAt()
                          )
                        )
                      )
                    );
                  }}
                />
              </div>
              <div className="w-full flex divide-x">
                <button
                  className="block w-full p-[3vmin] transition hover:bg-white hover:text-black text-left"
                  onClick={async () => {
                    const generatedKey = await generateKey();
                    setKey(generatedKey);
                    setDisplayedKey(
                      window.btoa(
                        String.fromCharCode(...(await exportKey(generatedKey)))
                      )
                    );
                  }}
                >
                  GENERATE KEY
                </button>
                <button
                  className="block w-full p-[3vmin] transition hover:bg-white hover:text-black text-left"
                  onClick={async () => {
                    const encrypted = await encrypt(data, key);
                    setData(
                      window.btoa(String.fromCharCode(...encrypted.cipher))
                    );
                    setIV(encrypted.iv);
                    setDisplayedIV(
                      window.btoa(String.fromCharCode(...encrypted.iv))
                    );
                  }}
                >
                  ENCRYPT
                </button>
                <button
                  className="block w-full p-[3vmin] transition hover:bg-white hover:text-black text-left"
                  onClick={async () => {
                    const decrypted = await decrypt(
                      {
                        cipher: new Uint8Array(
                          Array.from(window.atob(data)).map((c) =>
                            c.charCodeAt()
                          )
                        ),
                        iv: iv,
                      },
                      key
                    );
                    setData(decrypted);
                    setIV('');
                    setDisplayedIV('');
                  }}
                >
                  DECRYPT
                </button>
              </div>
            </section>
          </main>
        </section>
      </section>
    </motion.section>
  );
}
