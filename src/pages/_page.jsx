import { motion } from 'framer-motion';
export default function Page() {
  return (
    <motion.section
      animate={{ opacity: [0, 1] }}
      className="h-full w-full text-[3.5vmax]"
    >
      <nav className="flex flex-col justify-center items-center h-full w-full">
        <a
          href="/crypt/symmetric"
          className="block w-full hover:bg-white hover:text-black transition px-[13vmax]"
        >
          SYMMETRIC ENCRYPTION
        </a>
        <a
          href="/crypt/asymmetric"
          className="block w-full hover:bg-white hover:text-black transition px-[13vmax]"
        >
          ASYMMETRIC ENCRYPTION
        </a>
        <a
          href="/crypt/sign"
          className="block w-full hover:bg-white hover:text-black transition px-[13vmax]"
        >
          SIGN
        </a>
        <a
          href="/crypt/hash"
          className="block w-full hover:bg-white hover:text-black transition px-[13vmax]"
        >
          HASH
        </a>
        <footer className="text-white/5 absolute -z-10 text-[35vmax] font-black">
          CRYPT
        </footer>
      </nav>
    </motion.section>
  );
}
