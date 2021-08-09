import { motion } from "framer-motion";

export default function Custom500() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full  mt-10 justify-center "
    >
      <div className="w-1/3">
        <img src="/500.svg" className="w-full mb-4" />
        <p>
          Oh no! Something's gone wrong... This will be logged and i'll look
          into it!
        </p>
      </div>
    </motion.div>
  );
}
