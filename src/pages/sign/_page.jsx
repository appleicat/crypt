import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  generateKey,
  exportKey,
  importPublicKey,
  importPrivateKey,
  sign,
  verify,
} from '../../cryptography/sign';
export default function Page() {
  const [data, setData] = useState('');
  const [key, setKey] = useState({});
  const [displayedPublicKey, setDisplayedPublicKey] = useState('');
  const [displayedPrivateKey, setDisplayedPrivateKey] = useState('');
  const [signature, setSignature] = useState({});
  const [displayedSignature, setDisplayedSignature] = useState('');
  const [verified, setVerified] = useState(false);
  return (
    <motion.section
      animate={{ opacity: [0, 1] }}
      className="h-full w-full text-[1.5rem]"
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
            <div>SIGN</div>
            <div
              className="transition"
              style={{ color: verified ? 'white' : 'black' }}
            >
              VERIFIED
            </div>
          </header>
          <main className="flex h-full w-full divide-x">
            <div className="flex-auto flex flex-col justify-between items-center divide-y">
              <div className="h-1/2 w-full p-[3vmin]">
                <textarea
                  placeholder="message"
                  className="h-full w-full bg-transparent resize-none outline-none text-[1rem] font-['JetBrains_Mono']"
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
                />
              </div>
              <div className="h-1/2 w-full flex divide-x">
                <div className="h-full w-1/2 p-[3vmin]">
                  <textarea
                    placeholder="signature"
                    className="outline-none bg-transparent h-full w-full resize-none text-[1rem] font-['JetBrains_Mono']"
                    value={displayedSignature}
                    onChange={async (e) => {
                      setDisplayedSignature(e.target.value);
                      setSignature(
                        new Uint8Array(
                          Array.from(window.atob(e.target.value)).map((c) =>
                            c.charCodeAt()
                          )
                        )
                      );
                    }}
                  />
                </div>
                <div className="h-full w-1/2 p-[3vmin] break-all">
                  <textarea
                    placeholder="public key"
                    className="outline-none bg-transparent h-full w-full resize-none text-[1rem] font-['JetBrains_Mono']"
                    value={displayedPublicKey}
                    onChange={async (e) => {
                      setDisplayedPublicKey(e.target.value);
                      setKey({
                        ...key,
                        publicKey: await importPublicKey(
                          JSON.parse(e.target.value)
                        ),
                      });
                    }}
                  />
                </div>
                <div className="h-full w-1/2 p-[3vmin] break-all">
                  <textarea
                    placeholder="private key"
                    className="outline-none bg-transparent h-full w-full resize-none text-[1rem] font-['JetBrains_Mono']"
                    value={displayedPrivateKey}
                    onChange={async (e) => {
                      setDisplayedPrivateKey(e.target.value);
                      setKey({
                        ...key,
                        privateKey: await importPrivateKey(
                          JSON.parse(e.target.value)
                        ),
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <aside className="flex flex-col justify-evenly divide-y">
              <div className="h-full flex flex-col divide-y">
                <button
                  className="block p-[3vmin] h-1/2 transition hover:bg-white hover:text-black"
                  onClick={async () => {
                    const sig = await sign(data, key.privateKey);
                    setSignature(sig);
                    setDisplayedSignature(
                      window.btoa(String.fromCharCode(...sig))
                    );
                  }}
                >
                  <div className="h-full w-full text-left">SIGN</div>
                </button>
                <button
                  className="block p-[3vmin] h-1/2 transition hover:bg-white hover:text-black"
                  onClick={async () => {
                    setVerified(await verify(key.publicKey, signature, data));
                    setTimeout(() => {
                      setVerified(false);
                    }, 3000);
                  }}
                >
                  <div className="h-full w-full text-left">VERIFY</div>
                </button>
              </div>
              <div className="h-full flex flex-col divide-y">
                <button
                  className="block p-[3vmin] h-full transition hover:bg-white hover:text-black"
                  onClick={async () => {
                    const generatedKey = await generateKey();
                    setKey(generatedKey);
                    setDisplayedPublicKey(
                      JSON.stringify(await exportKey(generatedKey.publicKey))
                    );
                    setDisplayedPrivateKey(
                      JSON.stringify(await exportKey(generatedKey.privateKey))
                    );
                  }}
                >
                  <div className="h-full w-full text-left">
                    GENERATE
                    <br />
                    KEYS
                  </div>
                </button>
              </div>
            </aside>
          </main>
        </section>
      </section>
    </motion.section>
  );
}
