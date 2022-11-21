import useAssoCookie from "../../../lib/hooks/useAssoCookie";

import Button from "../../Button";
import Backdrop from "../../Backdrop";
import Modal from "../modal";

import Image from "next/future/image";
import Logotype from "../../../public/BODEGA-IMPORT_LOGOTYPE.svg";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function Settings({ openSettings }) {
  const [preferences, setPreferences] = useAssoCookie();
  const [consentSelect, setConsentSelect] = useState("");
  const [consumerSelect, setConsumerSelect] = useState("");
  useEffect(() => {
    setConsentSelect(preferences.consent);
    setConsumerSelect(preferences.consumer);
  }, [preferences]);
  const isFullConsent = preferences.consent === "all";
  const isRestaurant = preferences.consumer === "restaurant";

  const copy = {
    cookieConsent: isFullConsent
      ? "Just nu accepterar du alla våra kakor för bästa möjliga upplevelse "
      : "I nuläget accepterar du bara de allra nödvändigaste kakorna från oss ",
    consumer: `och vi visar det dryckesutbud som är relevant för dig som ${
      isRestaurant ? "restaurangkund" : "privatkund"
    }.`,
  };

  return (
    <Backdrop className="alert flex items-center justify-center p-4">
      <Modal>
        <div className="body pointer-events-none grid gap-4 px-6 sm:px-8">
          <header>
            <h2 className="mt-8 text-lg">
              Inställningar för sånt som har med kakor och dryck att göra
            </h2>
          </header>
          <p>
            {copy.cookieConsent}
            {copy.consumer}
          </p>
          <p>Du kan ändra det nedan, om du vill.</p>
        </div>
        <Select label={"Kakor"}>
          <Option
            value={"all"}
            useState={[consentSelect, setConsentSelect]}
            parent={"consent"}
          >
            Acceptera alla
          </Option>
          <Option
            parent={"consent"}
            value={"onlyRequired"}
            useState={[consentSelect, setConsentSelect]}
          >
            Endast nödvändiga
          </Option>
        </Select>
        <Select label={"Typ av kund"}>
          <Option
            parent={"consumer"}
            value={"private"}
            useState={[consumerSelect, setConsumerSelect]}
          >
            Privatkund
          </Option>
          <Option
            parent={"consumer"}
            value={"restaurant"}
            useState={[consumerSelect, setConsumerSelect]}
          >
            Restaurangkund
          </Option>
        </Select>
        <div>
          <Button
            size={"lg"}
            className={"underline"}
            onTap={() => {
              setPreferences({});
              openSettings(false);
            }}
          >
            Ta bort alla kakor och inställningar
          </Button>
        </div>
        <div className="bg-pink shadow-easeTopPink sticky bottom-0 z-10 mt-2 grid gap-2 rounded-md p-4 pt-0">
          <Button
            size={"lg"}
            className={"bg-white"}
            onTap={() => {
              setPreferences({
                consent: consentSelect,
                consumer: consumerSelect,
              });
              openSettings(false);
            }}
          >
            Spara och stäng
          </Button>
        </div>
      </Modal>
    </Backdrop>
  );
}

const Select = ({ children, label }) => {
  return (
    <div className="bg-wine-auxerrois/60 mx-4 flex flex-col items-center justify-center gap-2 rounded-md p-4 text-center font-mono">
      <h3 className="grow uppercase">{label}</h3>
      <div className="border-wine-gamay flex w-full grow flex-col rounded-md border text-center sm:flex-row">
        {children}
      </div>
    </div>
  );
};

const Option = ({ value, useState, children, parent }, props) => {
  const [state, setState] = useState;

  return (
    <Button
      size="lg"
      className={clsx("relative grow")}
      onTap={() => setState(value)}
    >
      {state === value && (
        <motion.div
          layoutId={`selected-${parent}`}
          className="bg-wine-gamay absolute inset-0 rounded-md"
        />
      )}
      <span className="relative z-10">{children}</span>
    </Button>
  );
};
