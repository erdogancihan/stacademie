import { SETLANGUAGE } from "../actions/languagesActions";
import en from "../../i18n/en";
import de from "../../i18n/de";
import tr from "../../i18n/tr";

const initialState = {
  language: "de",
  strings: de
};

const language = (state = initialState, action) => {
  switch (action.type) {
    case SETLANGUAGE:
      let strings = {};
      let errorMessage = {};
      strings = tr;
      if (action.language === "tr") {
        strings = tr;
        errorMessage = tr.errorMessage;
      } else if (action.language === "de") {
        strings = de;
        errorMessage = de.errorMessage;
      } else if (action.language === "en") {
        strings = en;
        errorMessage = en.errorMessage;
      }
      return {
        language: action.language,
        strings,
        errorMessage
      };
    default:
      return state;
  }
};

export default language;
