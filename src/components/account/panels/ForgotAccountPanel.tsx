import React, { useEffect, useState } from "react";
import SendEmailPanel from "./SendEmailPanel";
import VerifyCodePanel from "./VerifyCodePanel";

type forgotAccountPanelProps = {
  onPanelOpen: (x: boolean) => void;
};

function ForgotAccountPanel(props: forgotAccountPanelProps) {
  const [isSendEmailSuccess, setIsSendEmailSuccess] = useState<boolean>(false);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  useEffect(() => {
    props.onPanelOpen(isPanelOpen);
  }, [isPanelOpen]);

  return (
    <>
      {!isPanelOpen && (
        <button
          className="w-full text-xsFontSize text-textColor0 text-right relative underline underline-offset-1 mt-2"
          onClick={() => {
            setIsPanelOpen(true);
          }}
        >
          forgot password?
        </button>
      )}

      {isPanelOpen && (
        <div className="w-full border-solid border-textColor0 relative">
          {!isSendEmailSuccess && (
            <SendEmailPanel
              onSuccess={() => {
                setIsSendEmailSuccess(true);
              }}
              onPanelClose={() => {
                setIsPanelOpen(false);
              }}
            />
          )}
          {isSendEmailSuccess && (
            <VerifyCodePanel
              onSuccess={() => {
                setIsPanelOpen(true);
              }}
              onPanelClose={() => {
                setIsPanelOpen(false);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}

export default ForgotAccountPanel;
