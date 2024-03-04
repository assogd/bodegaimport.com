import useAssoCookie from "../../../lib/hooks/useAssoCookie";

import Button from "../../Button";
import Modal from "../modal";

import Image from "next/image";
import Logotype from "../../../public/BODEGA-IMPORT_LOGOTYPE.svg";

export default function ConsumerType() {
  const [preferences, setPreferences] = useAssoCookie();

  return (
    <Modal>
      <div className="body pointer-events-none grid gap-4 px-6 pt-12 sm:px-8">
        <header>
          <figure className="logotype">
            <Image
              src={Logotype}
              alt={"Bodega Import"}
              loading="eager"
              className="mx-auto"
            />
          </figure>
          <h2 className="mt-8 text-lg">...och erbjuda vin till alla!</h2>
        </header>
        <p>
          Om du har åldern inne, såklart. Därför vill vi kolla med dig så att du
          är över 25 år gammal.
        </p>
        <p>
          Vi kan också anpassa hemsidan så att den blir mer relevant för dig
          beroende av om du handlar för dig själv eller för den restaurang du
          arbetar på.
        </p>
      </div>
      <nav className="bg-pink shadow-easeTopPink sticky bottom-0 mt-2 grid gap-2 rounded-md p-4 pt-0">
        <Button
          size={"lg"}
          className={"bg-white"}
          onTap={() => setPreferences({ ...preferences, consumer: "private" })}
        >
          Jag har fyllt 25 år och är privatkund
        </Button>
        <Button
          size={"lg"}
          className={"bg-white"}
          onTap={() =>
            setPreferences({ ...preferences, consumer: "restaurant" })
          }
        >
          Jag har fyllt 25 år och är restaurangkund
        </Button>
        <Button
          size={"lg"}
          className={"bg-white/60"}
          href="https://www.systembolaget.se/under-20/"
        >
          Jag är under 25 år
        </Button>
      </nav>
    </Modal>
  );
}
