import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  generateKey,
  exportPublicKey,
  exportPrivateKey,
  importPublicKey,
  importPrivateKey,
  encrypt,
  decrypt,
} from '../../cryptography/asymmetric';
export default function Page() {
  const [privateKey, setPrivateKey] = useState();
  const [displayedPrivateKey, setDisplayedPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState();
  const [displayedPublicKey, setDisplayedPublicKey] = useState('');
  const [publicKeyA, setPublicKeyA] = useState();
  const [displayedPublicKeyA, setDisplayedPublicKeyA] = useState('');
  const [data, setData] = useState('');
  return (
    <motion.section
      animate={{ opacity: [0, 1] }}
      className="h-full w-full [font-size:clamp(1rem,3vmin,1.5rem)]"
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
            ASYMMETRIC ENCRYPTION
          </header>
          <main className="flex-auto flex h-full w-full justify-between items-center divide-x">
            <div className="h-full w-1/3 flex flex-col divide-y">
              <div className="p-[3vmin] h-full">
                <textarea
                  placeholder="public key"
                  className="outline-none bg-transparent h-full w-full resize-none text-[1rem] font-['JetBrains_Mono']"
                  value={displayedPublicKey}
                  onChange={async (e) => {
                    setDisplayedPublicKey(e.target.value);
                    setPublicKey(
                      await importPublicKey(
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
              <div className="p-[3vmin] h-full">
                <textarea
                  placeholder="private key"
                  className="outline-none bg-transparent h-full w-full resize-none text-[1rem] font-['JetBrains_Mono']"
                  value={displayedPrivateKey}
                  onChange={async (e) => {
                    setDisplayedPrivateKey(e.target.value);
                    setPrivateKey(
                      await importPrivateKey(
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
              <button
                className="block p-[3vmin] transition hover:bg-white hover:text-black text-left"
                onClick={async () => {
                  const generatedKeys = await generateKey();
                  setPrivateKey(generatedKeys.privateKey);
                  setPublicKey(generatedKeys.publicKey);
                  setDisplayedPrivateKey(
                    window.btoa(
                      String.fromCharCode(
                        ...(await exportPrivateKey(generatedKeys.privateKey))
                      )
                    )
                  );
                  setDisplayedPublicKey(
                    window.btoa(
                      String.fromCharCode(
                        ...(await exportPublicKey(generatedKeys.publicKey))
                      )
                    )
                  );
                }}
              >
                <div className="h-full w-full text-left break-all">
                  GENERATE KEYS
                </div>
              </button>
            </div>
            <div className="h-full w-full flex flex-col divide-y">
              <div className="p-[3vmin] h-full w-full">
                <textarea
                  placeholder="message"
                  className="outline-none bg-transparent h-full w-full resize-none text-[1rem] font-['JetBrains_Mono']"
                  value={data}
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
                />
              </div>
              <div className="p-[3vmin] h-full w-full">
                <textarea
                  placeholder="another public key"
                  className="outline-none bg-transparent h-full w-full resize-none text-[1rem] font-['JetBrains_Mono']"
                  value={displayedPublicKeyA}
                  onChange={async (e) => {
                    setDisplayedPublicKeyA(e.target.value);
                    setPublicKeyA(
                      await importPublicKey(
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
              <div className="flex divide-x">
                <button
                  className="block w-full p-[3vmin] transition hover:bg-white hover:text-black text-left"
                  onClick={async () => {
                    const encrypted = await encrypt(data, publicKeyA);
                    setData(window.btoa(String.fromCharCode(...encrypted)));
                  }}
                >
                  <div className="h-full w-full text-left break-all">
                    ENCRYPT
                  </div>
                </button>
                <button
                  className="block w-full p-[3vmin] transition hover:bg-white hover:text-black text-left"
                  onClick={async () => {
                    const decrypted = await decrypt(
                      new Uint8Array(
                        Array.from(window.atob(data)).map((c) => c.charCodeAt())
                      ),
                      privateKey
                    );
                    setData(decrypted);
                  }}
                >
                  <div className="h-full w-full text-left break-all">
                    DECRYPT
                  </div>
                </button>
              </div>
            </div>
          </main>
        </section>
      </section>
    </motion.section>
  );
}
