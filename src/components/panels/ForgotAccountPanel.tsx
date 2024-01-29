import React, { useContext, useEffect, useState } from "react";
import InformationInput from "../styledComponents/inputs/InformationInput";
import ClickButton from "../styledComponents/buttons/ClickButton";
import { AccountContext } from "../../context/account/accountContext";

type forgotAccountPanelProps = {
  onForgotAccountPanelOpen: (x: boolean) => void;
};
function ForgotAccountPanel(props: forgotAccountPanelProps) {
  const { accountSlice } = useContext(AccountContext);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailSendSuccess, setIsEmailSendSuccess] = useState<boolean>(false);
  const [isCodeVerifySuccess, setIsCodeVerifySuccess] =
    useState<boolean>(false);

  const [isForgetAccountPanelOpen, setIsForgetAccountPanelOpen] =
    useState<boolean>(false);
  useEffect(() => {
    props.onForgotAccountPanelOpen(isForgetAccountPanelOpen);
  }, [isForgetAccountPanelOpen]);

  const handleAccountSendMail = () => {
    accountSlice.forgetAccountPasswordWithCognito(email, setIsEmailSendSuccess);
  };

  const handleAccountVerifyCode = () => {
    accountSlice.confirmAccountPasswordWithCognito(
      code,
      password,
      setIsCodeVerifySuccess
    );
  };

  return (
    <>
      {!isForgetAccountPanelOpen && (
        <button
          className="text-[10px] w-full text-right top-3 relative underline underline-offset-1"
          onClick={() => {
            setIsForgetAccountPanelOpen(true);
          }}
        >
          forgot password?
        </button>
      )}
      <div className="w-full border-solid border-textColor0 relative">
        {isForgetAccountPanelOpen && (
          <>
            <InformationInput
              title={"send email to"}
              type="email"
              onChange={(e: { target: { value: any } }) => {
                setEmail(e.target.value ?? "");
              }}
            />
            <div className="pt-2">
              <ClickButton onClick={handleAccountSendMail}>Send</ClickButton>
            </div>
            {isEmailSendSuccess && (
              <>
                <InformationInput
                  title={"verification code"}
                  type="text"
                  onChange={(e: { target: { value: any } }) => {
                    setCode(e.target.value ?? "");
                  }}
                />
                <InformationInput
                  title={"new password"}
                  type="password"
                  onChange={(e: { target: { value: any } }) => {
                    setPassword(e.target.value ?? "");
                  }}
                />
                <div className="flex flex-row items-center justify-between w-full h-full mt-3">
                  <ClickButton
                    onClick={() => {
                      setIsForgetAccountPanelOpen(false);
                    }}
                  >
                    Cancel
                  </ClickButton>
                  <div className="px-3">/</div>
                  <ClickButton onClick={handleAccountVerifyCode}>
                    Verify
                  </ClickButton>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ForgotAccountPanel;
