import useAssoCookie from "../../lib/hooks/useAssoCookie";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "../Backdrop";
import CookieConsent from "./cookieConsent";
import ConsumerType from "./consumerType";

export default function Alerts({ lang }) {
  const [preferences, setPreferences] = useAssoCookie();

  return (
    <AnimatePresence>
      {(!preferences?.consent || !preferences?.consumer) && (
        <Backdrop className="alert flex items-center justify-center p-4">
          {!preferences?.consent && <CookieConsent />}
          {preferences && !preferences?.consumer && <ConsumerType />}
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
