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
    <div className="flex flex-col w-full h-fit relative">
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
    </div>
  );
});
export default AccountPanel;
