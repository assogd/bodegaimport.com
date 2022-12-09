import useAssoCookie from "../../../lib/hooks/useAssoCookie";

import Button from "../../Button";
import Backdrop from "../../Backdrop";
import Modal from "../modal";

import { useState, useEffect } from "react";
import clsx from "clsx";

import { Select, Option } from "../../Select";

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
        <div className="mx-4 flex flex-col items-center justify-center gap-2 rounded-md bg-wine-auxerrois/60 p-4 text-center font-mono">
          <h3 className="grow uppercase">Kakor</h3>
          <Select
            label={"Kakor"}
            className="flex w-full grow flex-col rounded-md border border-wine-gamay text-center sm:flex-row"
          >
            <Option
              value={"all"}
              useState={[consentSelect, setConsentSelect]}
              parent={"consent"}
              active={"absolute inset-0 rounded-md bg-wine-gamay"}
            >
              Acceptera alla
            </Option>
            <Option
              parent={"consent"}
              value={"onlyRequired"}
              useState={[consentSelect, setConsentSelect]}
              active={"absolute inset-0 rounded-md bg-wine-gamay"}
            >
              Endast nödvändiga
            </Option>
          </Select>
        </div>
        <div className="mx-4 flex flex-col items-center justify-center gap-2 rounded-md bg-wine-auxerrois/60 p-4 text-center font-mono">
          <h3 className="grow uppercase">Typ av kund</h3>
          <Select
            label={"Typ av kund"}
            className="flex w-full grow flex-col rounded-md border border-wine-gamay text-center sm:flex-row"
          >
            <Option
              parent={"consumer"}
              value={"private"}
              useState={[consumerSelect, setConsumerSelect]}
              active={"absolute inset-0 rounded-md bg-wine-gamay"}
            >
              Privatkund
            </Option>
            <Option
              parent={"consumer"}
              value={"restaurant"}
              useState={[consumerSelect, setConsumerSelect]}
              active={"absolute inset-0 rounded-md bg-wine-gamay"}
            >
              Restaurangkund
            </Option>
          </Select>
        </div>
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
        <div className="sticky bottom-0 z-10 mt-2 grid gap-2 rounded-md bg-pink p-4 pt-0 shadow-easeTopPink">
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
