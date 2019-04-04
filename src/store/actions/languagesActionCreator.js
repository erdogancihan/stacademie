import { SetLanguage } from "./languagesActions";



export function setLanguage(lang) {
  return dispatch => {
    localStorage.setItem("language", lang);
    return dispatch(SetLanguage(lang));
  };
}
//if session information is lost it gets data from localstorage and set user data
export function getLanguage() {
  return dispatch => {
    let lang = localStorage.getItem("language");
    return dispatch(SetLanguage(lang));
  };
}
