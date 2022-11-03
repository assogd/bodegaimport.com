import Image from "next/future/image";
import { PrismicRichText } from "@prismicio/react";
import Button from "../../components/Button";
import * as prismicH from "@prismicio/helpers";

export default function ContactCard({ data }) {
  const { district, email, name, phone, picture } = data;

  return (
    <div className="contact card bg-paleYellow grid max-w-xs gap-6 rounded-md p-4 text-center">
      <Image
        src={picture.url}
        width={picture.dimensions.width}
        height={picture.dimensions.height}
        layout="responsive"
        alt={picture.alt}
        className="bg-paleYellow rounded-md mix-blend-multiply grayscale"
      />

      <header className="">
        <div className="mono-base font-mono">
          <PrismicRichText field={district} />
        </div>
        <h5 className="text-lg">
          <PrismicRichText field={name} />
        </h5>
      </header>
      <nav className="grid gap-2">
        <Button
          size="lg"
          copyText={prismicH.asText(phone)}
          disabled={!prismicH.asText(phone)}
          className="flex-row justify-start bg-yellow"
        >
          <div className="mono-base font-mono">Telefon</div>
        </Button>
        <Button
          size="lg"
          className="bg-yellow"
          copyText={prismicH.asText(email)}
          disabled={!prismicH.asText(email)}
        >
          <div className="mono-base font-mono">Epost</div>
        </Button>
      </nav>
    </div>
  );
}
