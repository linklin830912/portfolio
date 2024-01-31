import React, { useContext, useEffect, useState } from "react";
import InformationInput from "../../styledComponents/inputs/InformationInput";
import ClickButton from "../../styledComponents/buttons/ClickButton";
import { AccountContext } from "../../../context/account/accountContext";
import { observer } from "mobx-react";
import ClickAysncButton, {
  AsyncStatus,
} from "../../styledComponents/buttons/ClickAsyncButton";

type changeAccountPanelProps = {
  onPanelOpen: (x: boolean) => void;
};

const ChangeAccountPanel = observer((props: changeAccountPanelProps) => {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");

  const { accountSlice } = useContext(AccountContext);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  useEffect(() => {
    props.onPanelOpen(isPanelOpen);
  }, [isPanelOpen]);

  const handleAccountUpdate = () => {
    if (accountSlice.user && email !== "") {
      setUpdateAccountStatus(AsyncStatus.loading);
      accountSlice.changeEmailWithCognito(email, (isSuccess) => {
        setUpdateAccountStatus(
          isSuccess ? AsyncStatus.done : AsyncStatus.error
        );
      });
    }
    if (accountSlice.user && oldPassword !== "" && newPassword !== "") {
      setUpdateAccountStatus(AsyncStatus.loading);
      accountSlice.changePasswordWithCognito(
        oldPassword,
        newPassword,
        (isSuccess) => {
          setUpdateAccountStatus(
            isSuccess ? AsyncStatus.done : AsyncStatus.error
          );
        }
      );
    }
  };

  const [updateAccountStatus, setUpdateAccountStatus] = useState<AsyncStatus>(
    AsyncStatus.done
  );

  return (
    <>
      {!isPanelOpen && (
        <button
          className="text-[10px] w-full text-right top-3 relative underline underline-offset-1"
          onClick={() => {
            setIsPanelOpen(true);
          }}
        >
          change email / password?
        </button>
      )}

      {isPanelOpen && (
        <div className="w-full border-solid border-textColor0 relative">
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
                setIsPanelOpen(false);
              }}
            >
              Cancel
            </ClickButton>
            <div className="px-3">/</div>
            <ClickAysncButton
              onClick={handleAccountUpdate}
              status={updateAccountStatus}
            >
              Update
            </ClickAysncButton>
          </div>
        </div>
      )}
    </>
  );
});

export default ChangeAccountPanel;
