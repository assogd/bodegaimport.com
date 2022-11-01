import Image from "next/future/image";
import Logotype from "../../../public/BODEGA-IMPORT_LOGOTYPE.svg";
import Button from "../../Button";

export const cookieConsent = {
  lang: "en-US",
  body: [
    <header>
      <figure className="logotype">
        <Image
          src={Logotype}
          alt={"CFHILL"}
          loading="eager"
          className="mx-auto"
        />
      </figure>
      <h2 className="mt-8 text-lg">Vi vill ge dig en bättre upplevelse</h2>
    </header>,
    <p>
      Vi använder kakor för att vår hemsida ska fungera på bästa möjliga sätt.
      Vissa av kakorna är nödvändiga för att vår hemsida ska fungera, medan
      andra används för att komma ihåg våra besökare och deras inställningar.
    </p>,
    <p>
      Du kan när som helst uppdatera dina preferenser i din webbläsares
      inställningar.
    </p>,
  ],
  buttons: [
    {
      className: "bg-white",
      size: "lg",
      value: "all",
      inlineText: "Acceptera alla",
    },
    {
      className: "bg-white/60",
      size: "lg",
      value: "onlyRequired",
      inlineText: "Acceptera endast nödvändiga",
    },
  ],
};
