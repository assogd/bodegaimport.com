import Image from "next/future/image";
import Logotype from "../public/BODEGA-IMPORT_LOGOTYPE.svg";
import Logotypes from "../public/LINJE-TIO_LOGOTYPES.svg";

import Tjoget from "../public/LINJE-TIO_LOGOTYPES/tjoget.svg";
import Liebling from "../public/LINJE-TIO_LOGOTYPES/liebling.svg";
import Eros from "../public/LINJE-TIO_LOGOTYPES/eros.svg";
import Paradiso from "../public/LINJE-TIO_LOGOTYPES/paradiso.svg";
import HornstullsBodega from "../public/LINJE-TIO_LOGOTYPES/hornstulls-bodega.svg";
import Positano from "../public/LINJE-TIO_LOGOTYPES/positano.svg";

export default function Footer() {
  const logotypes = [
    { src: Tjoget, alt: "Tjoget" },
    { src: Liebling, alt: "Restaurang Liebling" },
    { src: Eros, alt: "Eros" },
    { src: Paradiso, alt: "Paradiso" },
    { src: HornstullsBodega, alt: "Hornstulls Bodega" },
    { src: Positano, alt: "Positano" },
  ];

  return (
    <footer className="bg-toddTerje grid gap-4 p-8 text-center">
      <figure className="logotype mt-4">
        <Image
          src={Logotype}
          alt={"Bodega Import"}
          className="mx-auto h-24 sm:h-36"
        />
      </figure>
      <div className="flex flex-col gap-2">
        <p>Bodega Import</p>
        <p>
          Hornsbruksgatan 24
          <br />
          117 34 Stockholm
        </p>
        <p>
          +46 (0) 8 22 00 21
          <br />
          info@bodegaimport.com
        </p>
      </div>
      <div className="mt-4 inline-block rounded-md bg-white/40 p-6 pb-4">
        <p>Bodega Import är en del av 20-gruppen</p>
        <figure className="">
          {logotypes.map((logotype, i) => (
            <Image
              key={i}
              src={logotype.src}
              alt={logotype.alt}
              className="mx-auto mt-2 h-16"
            />
          ))}
        </figure>
      </div>
    </footer>
  );
}
