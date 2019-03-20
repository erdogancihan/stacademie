import { languageTr, languageEn, languageDe } from "./languagesActions";

//if session information is lost it gets data from localstorage and set user data
export function setLanguage(lang) {
  return dispatch => {
    if (lang === "en") {
      localStorage.setItem("language", "en");
      return dispatch(languageEn(lang));
    } else if (lang === "de") {
      localStorage.setItem("language", "de");
      return dispatch(languageDe(lang));
    } else {
      localStorage.setItem("language", "tr");
      return dispatch(languageTr(lang));
    }
  };
}

export function getLanguage() {
  return dispatch => {
    let language = localStorage.getItem("language");
    if (language === "en") {
      return dispatch(languageEn(language));
    } else if (language === "de") {
      return dispatch(languageDe(language));
    } else {
      return dispatch(languageTr(language));
    }
  };
}
