import useAssoCookie from "../../../lib/hooks/useAssoCookie";

import Button from "../../Button";
import Backdrop from "../../Backdrop";
import Modal from "../modal";

import Image from "next/future/image";
import Logotype from "../../../public/BODEGA-IMPORT_LOGOTYPE.svg";

export default function CookieConsent({ lang }) {
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
          <h2 className="mt-8 text-lg">Vi vill ge dig en bättre upplevelse</h2>
        </header>
        <p>
          Vi använder kakor för att vår hemsida ska fungera på bästa möjliga
          sätt. Vissa av kakorna är nödvändiga för att vår hemsida ska fungera,
          medan andra används för att komma ihåg våra besökare och deras
          inställningar.
        </p>
        <p>
          Du kan när som helst uppdatera dina preferenser i din webbläsares
          inställningar.
        </p>
      </div>
      <nav className="bg-pink shadow-easeTopPink sticky bottom-0 mt-2 grid gap-2 rounded-md p-4 pt-0">
        <Button
          size={"lg"}
          className={"bg-white"}
          onTap={() => setPreferences({ ...preferences, consent: "all" })}
        >
          Acceptera alla
        </Button>
        <Button
          size={"lg"}
          className={"bg-white/60"}
          onTap={() =>
            setPreferences({ ...preferences, consent: "onlyRequired" })
          }
        >
          Acceptera endast nödvändiga
        </Button>
      </nav>
    </Modal>
  );
}
