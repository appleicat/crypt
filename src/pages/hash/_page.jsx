import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { hash } from '../../cryptography/hash';
export default function Page() {
  const [data, setData] = useState('');
  const [type, setType] = useState('SHA-512');
  const [hashdata, setHashdata] = useState('');
  useEffect(() => {
    (async () => {
      setHashdata(await hash(data, type));
    })();
  }, [data, type]);
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
            <div>HASH</div>
            <div>{type}</div>
          </header>
          <main className="flex-auto flex flex-col justify-between items-center divide-y">
            <div className="h-full w-full p-[3vmin]">
              <textarea
                placeholder="message"
                className="h-full w-full bg-black resize-none outline-none font-['JetBrains_Mono']"
                onChange={(e) => {
                  setData(e.target.value);
                }}
              />
            </div>
            <div className="h-full w-full flex break-all divide-x">
              <div className="p-[3vmin] h-full w-full font-['JetBrains_Mono']">
                {hashdata}
              </div>
              <aside className="flex flex-col justify-evenly text-nowrap">
                <button
                  className="block p-[3vmin] h-full w-full transition hover:bg-white hover:text-black text-left"
                  onClick={() => {
                    setType('SHA-1');
                  }}
                >
                  SHA-1
                </button>
                <button
                  className="block p-[3vmin] h-full w-full transition hover:bg-white hover:text-black text-left"
                  onClick={() => {
                    setType('SHA-256');
                  }}
                >
                  SHA-256
                </button>
                <button
                  className="block p-[3vmin] h-full w-full transition hover:bg-white hover:text-black text-left"
                  onClick={() => {
                    setType('SHA-384');
                  }}
                >
                  SHA-384
                </button>
                <button
                  className="block p-[3vmin] h-full w-full transition hover:bg-white hover:text-black text-left"
                  onClick={() => {
                    setType('SHA-512');
                  }}
                >
                  SHA-512
                </button>
              </aside>
            </div>
          </main>
        </section>
      </section>
    </motion.section>
  );
}
