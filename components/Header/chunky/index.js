import Image from "next/future/image";
import Logotype from "../../../public/BODEGA-IMPORT_LOGOTYPE.svg";

export default function Header() {
  return (
    <header className="pointer-events-none relative select-none">
      <div className="sticky top-0 sm:h-[100vh]">
        <div className="flex h-full flex-col items-center justify-center gap-[8vw] py-16 md:translate-y-[-2em] md:gap-[4vw]">
          <Image
            src={Logotype}
            alt={"CFHILL"}
            loading="eager"
            className="mx-auto w-[32vw] sm:w-[16vw]"
          />
          <div className="text-[10vw] tracking-tight sm:text-[5vw]">
            Bodega Import
          </div>
        </div>
      </div>
    </header>
  );
}
