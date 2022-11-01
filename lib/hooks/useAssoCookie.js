import { useCookies } from "react-cookie";

const useAssoCookie = () => {
  const [cookies, setCookie] = useCookies(["assoCookie"]);

  const preferences = cookies.assoCookie;

  const setPreferences = (value) =>
    setCookie("assoCookie", value, { path: "/", maxAge: 2147483647 });

  return [preferences, setPreferences];
};

export default useAssoCookie;
