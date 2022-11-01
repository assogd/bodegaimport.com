import useAssoCookie from "../../../lib/hooks/useAssoCookie";
import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cookieConsent } from "./text";
import { generateKey } from "../../../lib/utils";
import Button from "../../Button";
import Backdrop from "../../Backdrop";
import Modal from "../modal";

export default function CookieConsent({ lang }) {
  const [preferences, setPreferences] = useAssoCookie();

  return (
    <Modal>
      <div className="body pointer-events-none grid gap-4 px-6 pt-12 md:px-8">
        {cookieConsent.body.map((el, i) => (
          <Fragment key={i}>{el}</Fragment>
        ))}
      </div>
      <nav className="bg-pink shadow-easeTopPink sticky bottom-0 mt-2 grid gap-2 rounded-md p-4 pt-0">
        {cookieConsent.buttons.map((button, i) => (
          <Button
            key={i}
            size={button.size}
            className={button.className}
            onTap={() =>
              setPreferences({ ...preferences, consent: button.value })
            }
          >
            {button.inlineText}
          </Button>
        ))}
      </nav>
    </Modal>
  );
}
