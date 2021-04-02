import Button from "components/Typography/Button/Button";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-1/3">
        <img src="/404.svg" className="w-full mb-4" />
        <p className="mb-4">
          Oh no! That wasn't found sorry, either try again or contact me.
        </p>
        <Link href="/">
          <Button text="Take me Back!" type="primary" />
        </Link>
      </div>
    </div>
  );
}
