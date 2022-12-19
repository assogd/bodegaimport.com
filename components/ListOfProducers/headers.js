import Header from "../Header/base/";
import { Heading } from "../Heading";

import clsx from "clsx";
import { motion } from "framer-motion";
import * as prismicH from "@prismicio/helpers";

import Button from "../Button";
import Link from "next/link";

export const Region = ({ children, item, view }) => {
  return (
    <section
      key={item.slug}
      className={clsx("region mb-12", view === "rows" ? "mb-4" : "mb-12")}
    >
      <Header
        className={clsx(
          view === "rows" && "md:mb-8",
          "relative mb-[-1.25em] lg:sticky"
        )}
        placement={{ col: "right" }}
        animate={"lg:translate-y-[-200%]"}
      >
        <Heading
          as="h2"
          size="xl"
          className="mt-8 underline decoration-1 underline-offset-4 lg:mt-0 lg:mb-8 lg:mb-0 lg:no-underline"
        >
          {item.origin.region}, {item.origin.country}
        </Heading>
      </Header>
      <RowContainer view={view}>{children}</RowContainer>
    </section>
  );
};

const RowContainer = ({ children, view }) =>
  view === "rows" ? (
    <div className="relative pb-8">
      <motion.ul
        className="sticky top-0 z-10 mb-[.15em] flex w-[72em] items-center gap-2 bg-peach/40 py-1 backdrop-blur-lg lg:w-full lg:justify-between"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "tween" },
        }}
        exit={{
          opacity: 0,
          y: -10,
          transition: { type: "tween" },
        }}
      >
        <Col className="basis-36 pl-6 md:basis-48">Producent</Col>
        <Col className="sticky left-2 basis-72 self-stretch">
          <span className="inline-block rounded-md bg-neutral-200/20 px-3 backdrop-blur">
            Etikett
          </span>
        </Col>
        <Col className="basis-60">Ursprung</Col>
        <Col className="basis-80 pr-6">Druvor</Col>
      </motion.ul>
      <div className="sticky left-6 mx-6 mt-[.1em] mb-2 hidden border-b" />
      {children}
    </div>
  ) : (
    children
  );

const Col = ({ className, children }) => {
  return (
    <li className={clsx("shrink-0 truncate leading-[1.1em]", className)}>
      {children}
    </li>
  );
};

export const Producer = ({ children, producer, view }) => {
  return (
    <motion.section
      className="producer"
      key={`card-${producer.id}`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ type: "tween" }}
    >
      <Header
        placement={{ col: "center" }}
        className="sticky pb-8 pt-11"
        animate={"translate-y-[-2.25em] lg:translate-y-0"}
      >
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-baseline">
          <Heading as="h2" size="xl" className="grow">
            {prismicH.asText(producer.data.title)}
          </Heading>
          <VisitProfile href={producer.url} />
        </div>
      </Header>
      {children}
    </motion.section>
  );
};

const VisitProfile = ({ href }) => {
  return (
    <div className="inline-block grow-0 translate-y-[-.25em]">
      <Link href={href}>
        <a>
          <Button
            className="bg-neutral-500/20 py-[0.125em] px-[0.5em] backdrop-blur"
            size="mini"
            whileHover={{ scale: 1.025 }}
          >
            Profil
          </Button>
        </a>
      </Link>
    </div>
  );
};
