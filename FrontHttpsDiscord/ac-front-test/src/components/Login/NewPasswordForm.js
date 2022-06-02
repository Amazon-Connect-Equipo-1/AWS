/* New Password Form
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Login/NewPasswordForm.css";
import logo from "../../images/logo_bbva.png";
import { useTranslation } from "react-i18next";
import Card from "../UI/Card";

const NewPasswordForm = (props) => {
  /*
  //Parsing data within the token query(FRONT)
  var cipher_data = req.query.token?.toString().split("$");

  //Encrypted token and its keys to be dencrypted
  const encrypted_token = Buffer.from(cipher_data[0], "hex");
  const iv = Buffer.from(cipher_data[1], "hex");
  const key = Buffer.from(cipher_data[2], "hex");

  //Creating the decipher for the token
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);

  //Dencrypting the token
  var decrypted_token = decipher.update(encrypted_token);
  decrypted_token = Buffer.concat([decrypted_token, decipher.final()]);

  //Original token
  const token = decrypted_token.toString();*/

  // Language
  const { t } = useTranslation();
  return (
    <Card className="npf-main-container">
      <div className="npf-container ">
        <form className="npf-form">
          <p className="npf-form-title">{t("setNewPassword")}</p>
          <label className="npf-label npf-margin-bottom-sm " for="lgf-email">
            {t("newPassword")}
          </label>
          <input id="npf-email" type="password" className="npf-input" />
          <div className="npf-flex">
            <label className=" npf-label npf-margin-bottom-sm npf-margin-top-md">
              {t("confirmNewPassword")}
            </label>
          </div>
          <input type="password" className="npf-input" />
          <button type="submit" className="npf-button">
            {t("setNewPasswordBtn")}
          </button>
        </form>
      </div>
    </Card>
  );
};

export default NewPasswordForm;
