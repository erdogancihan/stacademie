import {
  LANGUAGE_EN,
  LANGUAGE_TR,
  LANGUAGE_DE
} from "../actions/languagesActions";
import en from "../../i18n/en";
import de from "../../i18n/de";
import tr from "../../i18n/tr";

const initialState = {
  language: "de",
  strings: de
};

const language = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGE_TR:
     

      return {
        language: "tr",
        strings: tr,
        errorMessage:tr.errorMessage
      };
    case LANGUAGE_EN:
        return {
        language: "en",
        strings: en,
        errorMessage:en.errorMessage
      };
    case LANGUAGE_DE:
   
      return {
        language: "de",
        strings: de,
        errorMessage:de.errorMessage
      };

    default:
      return state;
  }
};

export default language;
