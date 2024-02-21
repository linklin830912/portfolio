import React, { useContext, useState } from "react";
import ClickButton from "../../styledComponents/buttons/ClickButton";
import ClickAysncButton, {
  AsyncStatus,
} from "../../styledComponents/buttons/ClickAsyncButton";
import InformationInput from "../../styledComponents/inputs/InformationInput";
import { AccountContext } from "../../../context/account/accountContext";
type sendEmailPanelProps = {
  onSuccess: () => void;
  onPanelClose: () => void;
};
function SendEmailPanel(props: sendEmailPanelProps) {
  const { accountSlice } = useContext(AccountContext);
  const [email, setEmail] = useState<string>("");

  const [sendEmailStatus, setSendEmailStatus] = useState<AsyncStatus>(
    AsyncStatus.done
  );
  const handleAccountSendMail = () => {
    setSendEmailStatus(AsyncStatus.loading);
    accountSlice.forgetAccountPasswordWithCognito(email, (isSuccess) => {
      setSendEmailStatus(isSuccess ? AsyncStatus.done : AsyncStatus.error);
      props.onSuccess();
    });
  };

  return (
    <>
      <InformationInput
        title={"send email to"}
        type="email"
        onChange={(e: { target: { value: any } }) => {
          setEmail(e.target.value ?? "");
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
        <div className="px-3 text-textColor0">/</div>
        <ClickAysncButton
          onClick={handleAccountSendMail}
          status={sendEmailStatus}
        >
          Send
        </ClickAysncButton>
      </div>
    </>
  );
}

export default SendEmailPanel;
