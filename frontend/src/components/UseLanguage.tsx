import { useTranslation } from "react-i18next";

function UseLanguage() {
  const { i18n, t } = useTranslation();
  const isNepaliLanguage = i18n.language != "en-US";
  return { i18n, t, isNepaliLanguage };
}

export default UseLanguage;
