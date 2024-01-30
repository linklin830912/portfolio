import React, { useContext, useEffect, useState } from "react";
import ClickButton from "../../styledComponents/buttons/ClickButton";
import ClickAysncButton, {
  AsyncStatus,
} from "../../styledComponents/buttons/ClickAsyncButton";
import InformationInput from "../../styledComponents/inputs/InformationInput";
import { AccountContext } from "../../../context/account/accountContext";

type verifyCodePanelProps = {
  onSuccess: () => void;
  onPanelClose: () => void;
};
function VerifyCodePanel(props: verifyCodePanelProps) {
  const { accountSlice } = useContext(AccountContext);
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [verifyCodeStatus, setVerifyCodeStatus] = useState<AsyncStatus>(
    AsyncStatus.done
  );

  const handleAccountVerifyCode = () => {
    accountSlice.confirmAccountPasswordWithCognito(
      code,
      password,
      (isSuccess) => {
        setVerifyCodeStatus(isSuccess ? AsyncStatus.done : AsyncStatus.error);
        if (isSuccess) props.onSuccess();
      }
    );
  };

  return (
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
            props.onPanelClose();
          }}
        >
          Cancel
        </ClickButton>
        <div className="px-3">/</div>
        <ClickAysncButton
          onClick={handleAccountVerifyCode}
          status={verifyCodeStatus}
        >
          Verify
        </ClickAysncButton>
      </div>
    </>
  );
}

export default VerifyCodePanel;
