import useAssoCookie from "../../lib/hooks/useAssoCookie";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "../Backdrop";
import CookieConsent from "./cookieConsent";
import ConsumerType from "./consumerType";
import { useState, useEffect } from "react";

export default function Alerts({ lang }) {
  const [shouldBeOpen, setOpen] = useState(false);
  const [preferences, setPreferences] = useAssoCookie();

  useEffect(
    () =>
      setOpen({
        consent: typeof preferences?.consent === "undefined",
        consumer: typeof preferences?.consumer === "undefined",
      }),
    [preferences]
  );

  return (
    <AnimatePresence>
      {(shouldBeOpen?.consent || shouldBeOpen?.consumer) && (
        <Backdrop className="alert flex items-center justify-center p-4">
          {shouldBeOpen?.consent ? (
            <CookieConsent />
          ) : (
            shouldBeOpen?.consumer && <ConsumerType />
          )}
        </Backdrop>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence>
      {(!preferences?.consent || !preferences?.consumer) && (
        <Backdrop className="alert flex items-center justify-center p-4">
          {!preferences?.consent ? (
            <CookieConsent />
          ) : (
            !preferences?.consumer && <ConsumerType />
          )}
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
