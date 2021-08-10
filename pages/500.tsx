import { motion } from "framer-motion";
import Image from "next/image";
import image from "public/500.svg";

export default function Custom500() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full  mt-10 justify-center "
    >
      <div className="w-1/3">
        <Image src={image} className="w-full mb-4" alt="505 image" />
        <p>
          Oh no! Something&lsquo;s gone wrong... This will be logged and
          i&lsquo;ll look into it!
        </p>
      </div>
    </motion.div>
  );
}
