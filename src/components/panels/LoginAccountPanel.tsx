import React, { useContext, useEffect, useState } from "react";
import InformationInput from "../styledComponents/inputs/InformationInput";
import { AccountContext } from "../../context/account/accountContext";
import { AccountStatus } from "../../classes/account/accountSlice";
import ClickButton from "../styledComponents/buttons/ClickButton";
import ClickAysncButton, {
  AsyncStatus,
} from "../styledComponents/buttons/ClickAsyncButton";

function LoginAccountPanel() {
  const { accountSlice } = useContext(AccountContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [signupButtonStatus, setSignupButtonStatus] = useState<AsyncStatus>(
    AsyncStatus.done
  );
  const [loginButtonStatus, setLoginButtonStatus] = useState<AsyncStatus>(
    AsyncStatus.done
  );

  const handleSignup = () => {
    accountSlice.signUpAccountWithCognito(email, password, (isSuccess) => {
      setSignupButtonStatus(isSuccess ? AsyncStatus.done : AsyncStatus.error);
    });
  };
  const handleLogin = () => {
    setLoginButtonStatus(AsyncStatus.loading);

    accountSlice.loginAccountWithCognito(email, password, (isSuccess) => {
      setLoginButtonStatus(isSuccess ? AsyncStatus.done : AsyncStatus.error);
      console.log("!!!login", accountSlice.status);
    });
  };

  const handleLogout = () => {
    accountSlice.logoutAccountWithCognito(() => {
      console.log("!!!logout", accountSlice.status);
    });
  };
  useEffect(() => {
    console.log("!!!useEffect", accountSlice.status);
  }, [accountSlice.status]);

  return (
    <>
      <InformationInput
        title={"email"}
        type="email"
        onChange={(e: { target: { value: any } }) => {
          setEmail(e.target.value ?? "");
        }}
      />
      <InformationInput
        title={"password"}
        type="password"
        onChange={(e: { target: { value: any } }) => {
          setPassword(e.target.value ?? "");
        }}
      />
      <div className="flex flex-row items-center justify-between w-full h-full mt-3">
        {accountSlice.status === AccountStatus.anonymous && (
          <>
            <ClickAysncButton
              onClick={handleSignup}
              status={signupButtonStatus}
            >
              Sign-up
            </ClickAysncButton>
            <div className="px-3">/</div>
            <ClickAysncButton onClick={handleLogin} status={loginButtonStatus}>
              Login
            </ClickAysncButton>
          </>
        )}
        <div>
          {accountSlice.status === AccountStatus.login ? "login" : "ana"}
        </div>
        {accountSlice.status === AccountStatus.login && (
          <ClickButton onClick={handleLogout}>Logout</ClickButton>
        )}
      </div>
    </>
  );
}

export default LoginAccountPanel;
