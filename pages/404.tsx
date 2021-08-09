import Button from "components/Typography/Button/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Custom404() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full  mt-10 justify-center "
    >
      <div className="w-1/3">
        <img src="/404.svg" className="w-full mb-4" />
        <p className="mb-4">
          Oh no! That wasn't found sorry, either try again or contact me.
        </p>
        <Link href="/">
          <Button text="Take me Back!" type="primary" />
        </Link>
      </div>
    </motion.div>
  );
}
