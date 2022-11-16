import Image from "next/future/image";
import Logotype from "../public/BODEGA-IMPORT_LOGOTYPE.svg";

import Tjoget from "../public/LINJE-TIO_LOGOTYPES/tjoget.svg";
import Liebling from "../public/LINJE-TIO_LOGOTYPES/liebling.svg";
import Eros from "../public/LINJE-TIO_LOGOTYPES/eros.svg";
import Paradiso from "../public/LINJE-TIO_LOGOTYPES/paradiso.svg";
import HornstullsBodega from "../public/LINJE-TIO_LOGOTYPES/hornstulls-bodega.svg";
import Positano from "../public/LINJE-TIO_LOGOTYPES/positano.svg";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function Footer() {
  const { inView, ref } = useInView({ threshold: 0.2 });

  const logotypes = [
    {
      src: Tjoget,
      alt: "Tjoget",
      className: "h-12 translate-y-[.125em]",
      href: "https://www.tjoget.com",
    },
    {
      src: Liebling,
      alt: "Restaurang Liebling",
      className: "h-12 w-auto translate-y-[-.25em]",
      href: "https://www.restaurangliebling.com",
    },
    {
      src: Eros,
      alt: "Eros",
      className: "h-12 w-auto",
      href: "https://www.instagram.com/erosbeerandliquorbar/",
    },
    {
      src: Paradiso,
      alt: "Paradiso",
      className: "h-12 w-auto",
      href: "https://www.paradisostockholm.se",
    },
    {
      src: HornstullsBodega,
      alt: "Hornstulls Bodega",
      className: "h-12 w-auto",
      href: "https://www.hornstullsbodega.com",
    },
    {
      src: Positano,
      alt: "Positano",
      className: "h-12 w-auto",
      href: "https://positanoyes.com",
    },
  ];

  return (
    <footer className="bg-toddTerje" ref={ref}>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: inView ? 0 : 100 }}
        transition={{ type: "tween", duration: 0.5 }}
        className="grid gap-4 p-8 text-center"
      >
        <figure className="logotype mt-4">
          <Image
            src={Logotype}
            alt={"Bodega Import"}
            className="mx-auto h-24 sm:h-36"
          />
        </figure>
        <div className="flex flex-col gap-3">
          <h2 className="">Bodega Import</h2>
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
        <div className="mt-4 inline-block rounded-md bg-white/40 p-6">
          <p>Bodega Import är en del av 20-gruppen</p>
          <figure className="mx-auto mt-4 flex max-w-5xl flex-col flex-wrap items-center justify-around gap-x-12 gap-y-4 sm:flex-row md:mt-6">
            {logotypes.map((logotype, i) => (
              <a href={logotype.href} key={i}>
                <Image
                  src={logotype.src}
                  alt={logotype.alt}
                  className={logotype.className}
                />
              </a>
            ))}
          </figure>
        </div>
      </motion.div>
    </footer>
  );
}
