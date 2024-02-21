import React, { useContext, useState } from "react";
import InformationInput from "../../styledComponents/inputs/InformationInput";
import { AccountContext } from "../../../context/account/accountContext";
import ClickAysncButton, {
  AsyncStatus,
} from "../../styledComponents/buttons/ClickAsyncButton";
import { observer } from "mobx-react";

const LoginAccountPanel = observer(() => {
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
    setSignupButtonStatus(AsyncStatus.loading);
    accountSlice.signUpAccountWithCognito(email, password, (isSuccess) => {
      setSignupButtonStatus(isSuccess ? AsyncStatus.done : AsyncStatus.error);
    });
  };
  const handleLogin = () => {
    setLoginButtonStatus(AsyncStatus.loading);
    accountSlice.loginAccountWithCognito(email, password, (isSuccess) => {
      setLoginButtonStatus(isSuccess ? AsyncStatus.done : AsyncStatus.error);
    });
  };

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
      <div className="flex flex-row items-center justify-between w-full h-full mt-2 relative">
        <ClickAysncButton onClick={handleSignup} status={signupButtonStatus}>
          Sign-up
        </ClickAysncButton>
        <div className="px-3 text-textColor0">/</div>
        <ClickAysncButton onClick={handleLogin} status={loginButtonStatus}>
          Login
        </ClickAysncButton>
      </div>
    </>
  );
});

export default LoginAccountPanel;
