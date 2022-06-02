/* Settings
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import React, { useContext, useEffect, useState } from "react";
import "../../styles/Settings/Settings.css";
import Card from "../UI/Card";
import { useTranslation } from "react-i18next";
import LocaleContext from "../../LocaleContext";
import i18n from "../../i18n";
import { saveKeys, saveClick } from "../MonitorModule.js";

//Creates functions Settings and its constants
function Settings() {
  const INPUT_NAME = "settings";

  const body = document.body;

  const lightTheme = "light";
  const darkTheme = "dark";
  const darkTheme_Protanopia = "dark_protanopia";
  const darkTheme_Deuteranopia = "dark_deuteranopia";
  const darkTheme_Tritanopia = "dark_tritanopia";
  const darkTheme_Protanomaly = "dark_protanomaly";
  const darkTheme_Deuteranomaly = "dark_deuteranomaly";
  const darkTheme_Tritanomaly = "dark_tritanomaly";
  let theme;

  const smallTxtSize = "small";
  const mediumTxtSize = "medium";
  const bigTxtSize = "big";
  let txtSize;

  let lang;
  if (localStorage) {
    theme = localStorage.getItem("theme");
    txtSize = localStorage.getItem("txtSize");
  }

  if (
    txtSize === smallTxtSize ||
    txtSize === mediumTxtSize ||
    txtSize === bigTxtSize
  ) {
    body.classList.add(txtSize);
  } else {
    body.classList.add(smallTxtSize);
    body.classList.add(mediumTxtSize);
    body.classList.add(bigTxtSize);
  }

  if (
    theme === lightTheme ||
    theme === darkTheme ||
    theme === darkTheme_Protanopia ||
    theme === darkTheme_Deuteranopia ||
    theme === darkTheme_Tritanopia ||
    theme === darkTheme_Protanomaly ||
    theme === darkTheme_Deuteranomaly ||
    theme === darkTheme_Tritanomaly
  ) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
    body.classList.add(darkTheme_Protanopia);
    body.classList.add(darkTheme_Deuteranopia);
    body.classList.add(darkTheme_Tritanopia);
    body.classList.add(darkTheme_Protanomaly);
    body.classList.add(darkTheme_Deuteranomaly);
    body.classList.add(darkTheme_Tritanomaly);
  }

  const switchTxtSize = (s) => {
    console.log(s);
    body.classList.replace(txtSize, s);
    localStorage.setItem("txtSize", s);
    txtSize = s;

    //peticion
    const myHeadersToken = new Headers();
    myHeadersToken.append(
      "Authorization",
      `Bearer ${window.localStorage.getItem("token")}`
    );

    const requestOptionsGET = {
      method: "GET",
      headers: myHeadersToken,
    };

    //Save manager info in local storage
    // fetch(
    //   `http://35.88.250.238:8080/userConfig/getrUserConfig?id=${window.localStorage.getItem(
    //     "email"
    //   )}`,
    //   requestOptionsGET
    // )
    //   .then((response) => response.text())
    //   .then((result) => {
    //     const resultJSON = JSON.parse(result);
    //     console.log(resultJSON);
    //     window.localStorage.setItem("name", resultJSON.manager_name);
    //     window.localStorage.setItem("id", resultJSON.manager_id);
    //   })
    //   .catch((error) => console.log("error", error));
  };

  const switchTheme = (e) => {
    console.log(e);
    body.classList.replace(theme, e);
    localStorage.setItem("theme", e);
    theme = e;
  };

  // Language
  const { t } = useTranslation();

  const { locale } = useContext(LocaleContext);

  function changeLocale() {
    const l = document.getElementById("lang").value;
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
    document.getElementById("nav-title").textContent = t("Settings");
  }

  useEffect(() => {
    document.getElementById("theme-select").value = theme;
    document.getElementById("size-select").value = txtSize;
    document.getElementById("nav-title").textContent = t("Settings");
  });

  return (
    <Card className="stngs-main-container">
      <div className="stngs-container" data-aos="fade-up">
        <div className="stngs-option">
          <p>{t("textSize")}</p>
          <select
            onClick={() => saveClick(`${INPUT_NAME} font size`)}
            id="size-select"
            className="stngs-select"
            onChange={(j) => switchTxtSize(j.target.value)}
          >
            <option value="medium">{t("textMediumSize")}</option>
            <option value="small">{t("textSmallSize")}</option>
            <option value="big">{t("textBigSize")}</option>
          </select>
        </div>
        <div className="stngs-option">
          <p>{t("theme")}</p>
          <select
            onClick={() => saveClick(`${INPUT_NAME} theme`)}
            id="theme-select"
            className="stngs-select"
            onChange={(i) => switchTheme(i.target.value)}
          >
            <option value="dark">{t("darkTheme")}</option>
            <option value="light">{t("lightTheme")}</option>
            <option value="dark_protanopia">{t("darkProtanopiaTheme")}</option>
            <option value="dark_deuteranopia">
              {t("darkDeuteranopiaTheme")}
            </option>
            <option value="dark_tritanopia">{t("darkTritanopiaTheme")}</option>
            <option value="dark_protanomaly">
              {t("darkProtanomalyTheme")}
            </option>
            <option value="dark_deuteranomaly">
              {t("darkDeuteranomalyTheme")}
            </option>
            <option value="dark_tritanomaly">
              {t("darkTritanomalyTheme")}
            </option>
          </select>
        </div>
        <div className="stngs-option">
          <p>{t("language")}</p>
          <select
            onClick={() => saveClick(`${INPUT_NAME} language`)}
            id="lang"
            className="stngs-select"
            onChange={() => changeLocale()}
          >
            <option value="en">{t("englishLanguage")}</option>
            <option value="es">{t("spanishLanguage")}</option>
            <option value="fr">{t("frenchLanguage")}</option>
          </select>
        </div>
        <div className="stngs-restore-container">
          <button
            className="stngs-restore-btn"
            onClick={() => {
              switchTxtSize("medium");
              document.getElementById("size-select").value = "medium";
              switchTheme("dark");
              document.getElementById("theme-select").value = "dark";
              i18n.changeLanguage("en");
              document.getElementById("lang").value = "en";
            }}
          >
            Restore to default
          </button>
        </div>
      </div>
    </Card>
  );
}

export default Settings;
