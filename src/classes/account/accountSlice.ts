import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserSession,
  CognitoUserAttribute,
  CognitoIdToken,
} from "amazon-cognito-identity-js";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import poolData from "../../const/account/userPool";

// export enum AccountPanelStage {
//   loginAccount = 1,
//   forgetPassword = 2,
//   changeAccount = 3,
// }

export enum AccountStatus {
  login = 1,
  anonymous = 2,
}

class AccountSlice {
  pool: CognitoUserPool;
  user: CognitoUser | null;
  // authDetails?: AuthenticationDetails;
  status: AccountStatus;
  email?: string;

  constructor() {
    this.pool = new CognitoUserPool(poolData);
    this.user = this.pool.getCurrentUser();
    this.status = AccountStatus.anonymous;

    if (this.user) {
      //user already logged in
      let session;
      this.user.getSession((err: Error, sess: CognitoUserSession | null) => {
        session = sess;
        if (session) {
          const idTokenPayload = session.getIdToken().payload;
          this.email = idTokenPayload.email;
          this.status = AccountStatus.login;
        }
      });
    }

    makeAutoObservable(this, {
      status: observable,
      user: observable,
      email: observable,
      authAccountWithCognito: action,
      signUpAccountWithCognito: action,
      loginAccountWithCognito: action,
      logoutAccountWithCognito: action,
      changeEmailWithCognito: action,
      changePasswordWithCognito: action,
      forgetAccountPasswordWithCognito: action,
      confirmAccountPasswordWithCognito: action,
    });
  }

  authAccountWithCognito(
    email: string,
    password: string,
    callback: (isSuccess: boolean) => void
  ) {
    if (this.user && email !== "" && password !== "") {
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      this.user.authenticateUser(authDetails, {
        onSuccess: () => {
          this.status = AccountStatus.login;
          this.email = email;

          callback(true);
        },
        onFailure: () => {
          this.status = AccountStatus.anonymous;
          this.email = undefined;

          localStorage.removeItem("cognitoUserSession");

          callback(false);
        },
      });
    } else {
      this.status = AccountStatus.anonymous;
      this.email = undefined;

      localStorage.removeItem("cognitoUserSession");

      callback(true);
    }
  }

  signUpAccountWithCognito(
    email: string,
    password: string,
    callback: (isSuccess: boolean) => void
  ) {
    this.pool.signUp(email, password, [], [], (err) => {
      callback(err === null || err === undefined);
      if (err === null || err === undefined) {
        this.email = email;
      }
    });
    this.user = this.pool.getCurrentUser();
  }

  loginAccountWithCognito(
    email: string,
    password: string,
    callback: (isSuccess: boolean) => void
  ) {
    this.user = new CognitoUser({
      Username: email,
      Pool: this.pool,
    });
    this.authAccountWithCognito(email, password, callback);
  }

  logoutAccountWithCognito(callback: (isSuccess: boolean) => void) {
    if (this.user) {
      this.user.signOut(() => {
        this.authAccountWithCognito("", "", callback);
      });
    }
  }
  changeEmailWithCognito(
    newEmail: string,
    callback: (isSuccess: boolean) => void
  ) {
    if (this.user)
      this.user.updateAttributes(
        [new CognitoUserAttribute({ Name: "email", Value: newEmail })],
        (err) => {
          callback(err === null || err === undefined);
          if (err === null || err === undefined) {
            this.email = newEmail;
          }
        }
      );
  }
  changePasswordWithCognito(
    oldPassword: string,
    newPassword: string,
    callback: (isSuccess: boolean) => void
  ) {
    if (this.user)
      this.user.changePassword(oldPassword, newPassword, (err) => {
        callback(err === null || err === undefined);
      });
  }

  forgetAccountPasswordWithCognito(
    email: string,
    callback: (isSuccess: boolean) => void
  ) {
    const newUser = new CognitoUser({
      Username: email,
      Pool: this.pool,
    });

    newUser.forgotPassword({
      onSuccess: () => callback(true),
      onFailure: () => callback(false),
    });

    this.user = newUser;
  }

  confirmAccountPasswordWithCognito(
    code: string,
    newPassword: string,
    callback: (isSuccess: boolean) => void
  ) {
    if (this.user) {
      this.user.confirmPassword(code, newPassword, {
        onSuccess: () => callback(true),
        onFailure: () => callback(false),
      });
    } else {
      callback(false);
    }
  }
}

export default AccountSlice;
