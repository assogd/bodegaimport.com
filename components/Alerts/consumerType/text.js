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
      <h2 className="mt-8 text-lg">...och erbjuda vin till alla!</h2>
    </header>,
    <p>
      Om du har åldern inne, såklart. Därför vill vi kolla med dig så att du är
      över 25 år gammal.
    </p>,
    <p>
      Vi kan också anpassa hemsidan så att den blir mer relevant för dig
      beroende av om du handlar för dig själv eller för den restaurang du
      arbetar på.
    </p>,
  ],
  buttons: [
    {
      className: "bg-white",
      size: "lg",
      value: "private",
      inlineText: "Jag har fyllt 25 år och är privatkund",
    },
    {
      className: "bg-white",
      size: "lg",
      value: "business",
      inlineText: "Jag har fyllt 25 år och är restaurangkund",
    },
  ],
};
