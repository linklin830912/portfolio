import React, { useContext, useEffect, useState } from "react";
import InformationInput from "../styledComponents/inputs/InformationInput";
import ClickButton from "../styledComponents/buttons/ClickButton";
import { AccountContext } from "../../context/account/accountContext";
type changeAccountPanelProps = {
  onChangeAccountPanelOpen: (x: boolean) => void;
};

function ChangeAccountPanel(props: changeAccountPanelProps) {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");

  const { accountSlice } = useContext(AccountContext);
  const [isChangeAccountPanelOpen, setIsChangeAccountPanelOpen] =
    useState<boolean>(false);

  useEffect(() => {
    props.onChangeAccountPanelOpen(isChangeAccountPanelOpen);
  }, [isChangeAccountPanelOpen]);

  const handleAccountUpdate = () => {
    accountSlice.changeAccountWithCognito({
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  };
  return (
    <>
      {!isChangeAccountPanelOpen && (
        <button
          className="text-[10px] w-full text-right top-3 relative underline underline-offset-1"
          onClick={() => {
            setIsChangeAccountPanelOpen(true);
          }}
        >
          change email / password?
        </button>
      )}
      <div className="w-full border-solid border-textColor0 relative">
        {isChangeAccountPanelOpen && (
          <>
            <InformationInput
              title={"new email"}
              type="email"
              onChange={(e: { target: { value: any } }) => {
                setEmail(e.target.value ?? "");
              }}
            />
            <InformationInput
              title={"old password"}
              type="password"
              onChange={(e: { target: { value: any } }) => {
                setOldPassword(e.target.value ?? "");
              }}
            />
            <InformationInput
              title={"new password"}
              type="password"
              onChange={(e: { target: { value: any } }) => {
                setNewPassword(e.target.value ?? "");
              }}
            />

            <div className="flex flex-row items-center justify-between w-full h-full mt-3">
              <ClickButton
                onClick={() => {
                  setIsChangeAccountPanelOpen(false);
                }}
              >
                Cancel
              </ClickButton>
              <div className="px-3">/</div>
              <ClickButton onClick={handleAccountUpdate}>Update</ClickButton>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ChangeAccountPanel;
