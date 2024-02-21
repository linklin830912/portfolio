import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import ChangeAccountPanel from "./ChangeAccountPanel";
import LoginAccountPanel from "./LoginAccountPanel";
import { AccountContext } from "../../../context/account/accountContext";
import { AccountStatus } from "../../../classes/account/accountSlice";
import ForgotAccountPanel from "./ForgotAccountPanel";
import LogoutAccountPanel from "./LogoutAccountPanel";

type accountPanelProps = {
  onClose: () => void;
};

const AccountPanel = observer((props: accountPanelProps) => {
  const { accountSlice } = useContext(AccountContext);

  const [isLoginLogoutAccountPanelOpen, setIsLoginLogoutAccountPanelOpen] =
    useState<boolean>(false);

  return (
    <div className="bg-mainColor0 pointer-events-auto flex flex-col w-[20%] min-w-[280px] relative text-textColor0 opacity-80 rounded-md shadow-lg shadow-black-500/50 px-3 pt-2 pb-5">
      {isLoginLogoutAccountPanelOpen &&
        accountSlice.status === AccountStatus.anonymous && (
          <LoginAccountPanel />
        )}
      {accountSlice.status === AccountStatus.anonymous && (
        <ForgotAccountPanel
          onPanelOpen={(isPanelOpen) =>
            setIsLoginLogoutAccountPanelOpen(!isPanelOpen)
          }
        />
      )}
      {isLoginLogoutAccountPanelOpen &&
        accountSlice.status === AccountStatus.login && <LogoutAccountPanel />}
      {accountSlice.status === AccountStatus.login && (
        <ChangeAccountPanel
          onPanelOpen={(isPanelOpen) =>
            setIsLoginLogoutAccountPanelOpen(!isPanelOpen)
          }
        />
      )}
      <button
        className="absolute right-1 top-[-3px] text-textColor0"
        onClick={props.onClose}
      >
        ⨯
      </button>
    </div>
  );
});
export default AccountPanel;
