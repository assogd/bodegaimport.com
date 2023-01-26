import Image from "next/future/image";
import { PrismicRichText } from "@prismicio/react";
import Button from "../../components/Button";
import * as prismicH from "@prismicio/helpers";
import { useState } from "react";
import { LoadingAssetAnimation } from "../../components/Animations";

export const Container = ({ children, slice }) => {
  return (
    <section className={`cards ${slice.variation}`}>
      <header className="text-center">
        {slice.primary.title && <PrismicRichText field={slice.primary.title} />}
        {slice.primary.introduction && (
          <div className="hyphens mx-auto max-w-4xl">
            <PrismicRichText field={slice.primary.introduction} />
          </div>
        )}
      </header>
      <div className="mx-auto mt-4 flex max-w-5xl flex-wrap justify-center gap-4 p-4 sm:grid-cols-3 sm:px-[5%]">
        {children}
      </div>
    </section>
  );
};

export const Card = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  const { district, email, name, phone, picture } = data;

  return (
    <div className="contact card grid max-w-xs shrink grow basis-72 gap-6 rounded-md bg-paleYellow p-4 text-center">
      <LoadingAssetAnimation loaded={loaded}>
        <Image
          src={picture.url}
          width={picture.dimensions.width}
          height={picture.dimensions.height}
          layout="responsive"
          alt={picture.alt}
          className="rounded-md bg-paleYellow mix-blend-multiply grayscale"
          onLoadingComplete={() => setLoaded(true)}
        />
      </LoadingAssetAnimation>
      <header className="">
        <div className="font-mono">
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
          <div className="font-mono">Telefon</div>
        </Button>
        <Button
          size="lg"
          className="bg-yellow"
          copyText={prismicH.asText(email)}
          disabled={!prismicH.asText(email)}
        >
          <div className="font-mono">Epost</div>
        </Button>
      </nav>
    </div>
  );
};
