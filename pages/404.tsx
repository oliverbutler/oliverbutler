import Button from "components/Typography/Button/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import image from "public/404.svg";

export default function Custom404() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full  mt-10 justify-center "
    >
      <div className="w-1/3">
        <Image src={image} className="w-full mb-4" alt="404 image" />
        <p className="mb-4">
          Oh no! That wasn&lsquo;t found sorry, either try again or contact me.
        </p>
        <Button variant="secondary" link={{ href: "/" }}>
          Take me Back!
        </Button>
      </div>
    </motion.div>
  );
}
