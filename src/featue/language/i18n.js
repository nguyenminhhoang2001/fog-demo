import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import manager_en from "../../locales/en/manager.json";
import manager_vi from "../../locales/vi/manager.json";
import login_en from "../../locales/en/login.json";
import login_vi from "../../locales/vi/login.json";
import register_en from "../../locales/en/register.json";
import register_vi from "../../locales/vi/register.json";

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
};
const resources = {
  en: {
    login: login_en,
    manager: manager_en,
    register: register_en,
  },
  vi: {
    login: login_vi,
    manager: manager_vi,
    register: register_vi,
  },
};
const defaulNS = ["manager"];
i18n.use(initReactI18next).init({
  defaulNS,
  resources,
  lng: "vi",
  ns: ["manager", "login", "register"],
  fallBackLng: "vi",
  interpolation: { escapeValue: false },
});
