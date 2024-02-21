import React, { useContext, useState } from "react";
import ClickAysncButton, {
  AsyncStatus,
} from "../../styledComponents/buttons/ClickAsyncButton";
import { AccountContext } from "../../../context/account/accountContext";

function LogoutAccountPanel() {
  const { accountSlice } = useContext(AccountContext);
  const [logoutButtonStatus, setLogoutButtonStatus] = useState<AsyncStatus>(
    AsyncStatus.done
  );
  const handleLogout = () => {
    setLogoutButtonStatus(AsyncStatus.loading);
    accountSlice.logoutAccountWithCognito((isSuccess) => {
      setLogoutButtonStatus(isSuccess ? AsyncStatus.done : AsyncStatus.error);
    });
  };
  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <div className="w-full flex flex-col justify-center items-start pb-2">
        <label className="text-xsFontSize text-textColor0">email:</label>
        <div className="text-smFontSize text-textColor0 text-center w-full">
          {accountSlice.email}
        </div>
      </div>

      <ClickAysncButton onClick={handleLogout} status={logoutButtonStatus}>
        Logout
      </ClickAysncButton>
    </div>
  );
}

export default LogoutAccountPanel;
