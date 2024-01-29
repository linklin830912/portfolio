import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import ChangeAccountPanel from "./ChangeAccountPanel";
import LoginAccountPanel from "./LoginAccountPanel";
import { AccountContext } from "../../context/account/accountContext";
import { AccountStatus } from "../../classes/account/accountSlice";
import ForgotAccountPanel from "./ForgotAccountPanel";

type accountPanelProps = {
  onClose: () => void;
};

const AccountPanel = observer((props: accountPanelProps) => {
  const { accountSlice } = useContext(AccountContext);

  const [isLoginAccountPanelClosed, setIsLoginAccountPanelClosed] =
    useState<boolean>(false);

  return (
    <div className="bg-mainColor0 pointer-events-auto flex flex-col w-[20%] min-w-[280px] relative text-textColor0 opacity-80 rounded-md shadow-lg shadow-black-500/50 px-3 pt-2 pb-5">
      {!isLoginAccountPanelClosed && <LoginAccountPanel />}
      {isLoginAccountPanelClosed &&
        accountSlice.status === AccountStatus.anonymous && (
          <ForgotAccountPanel
            onForgotAccountPanelOpen={setIsLoginAccountPanelClosed}
          />
        )}
      {isLoginAccountPanelClosed &&
        accountSlice.status === AccountStatus.login && (
          <ChangeAccountPanel
            onChangeAccountPanelOpen={setIsLoginAccountPanelClosed}
          />
        )}

      <button
        className="absolute right-1 top-[-20px] text-red-300"
        onClick={props.onClose}
      >
        X
      </button>
    </div>
  );
});
export default AccountPanel;
