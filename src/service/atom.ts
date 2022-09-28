import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default:
    !sessionStorage.getItem("isDark") || sessionStorage.getItem("isDark") === "true" ? true : false,
});
