import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Button from "../../Button";
import Link from "next/link";
import * as prismicH from "@prismicio/helpers";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { getCardId } from "../../../lib/utils";
import { Container, Header, Gradient, Open } from "../elements";

const Default = ({ data, size, params, href }) => {
  const { query } = useRouter();

  return (
    <Container
      size={size}
      className={"rounded-md bg-white font-mono text-monoBase"}
    >
      <Header>
        <PrismicRichText field={data.primary.title} />
        {(href || params) && (
          <Open
            href={
              href ?? `/producent/${params.producer.slug}#${getCardId(data)}`
            }
          />
        )}
      </Header>
      <PrismicRichText field={data.primary.body} />
      <Gradient />
    </Container>
  );
};

export default Default;

const Expand = ({ params, data }) => {
  const { push } = useRouter();

  return (
    <nav className="absolute inset-x-0 bottom-0 rounded-md bg-white px-4 pb-4 pt-0 text-center shadow-easeTop sm:px-4 sm:py-4">
      <Button
        onTap={() =>
          push(
            `/producent/${params.producer.slug}#${getCardId(data)}`,
            undefined,
            {}
          )
        }
        className="w-full border-0 border-solid bg-yellow font-serif text-base"
      >
        Öppna
      </Button>
    </nav>
  );
};

const Close = ({ params }) => {
  const { push } = useRouter();

  return (
    <nav className="sticky inset-x-4 bottom-0 rounded-md bg-white px-0 pb-4 pt-0 text-center shadow-easeTop sm:px-10 sm:py-8">
      <Button
        className="w-full border border-solid bg-white font-serif text-base"
        onTap={() => push(`/sortiment`, undefined, { shallow: true })}
      >
        Stäng
      </Button>
    </nav>
  );
};
