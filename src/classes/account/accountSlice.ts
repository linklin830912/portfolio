import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserSession,
  CognitoUserAttribute,
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
  authDetails?: AuthenticationDetails;
  status: AccountStatus;
  email?: string;

  constructor() {
    this.pool = new CognitoUserPool(poolData);
    this.user = null;
    this.status = AccountStatus.anonymous;

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
          callback(true);
          this.email = email;
        },
        onFailure: () => {
          this.status = AccountStatus.anonymous;
          callback(false);
          this.email = undefined;
        },
      });
    } else {
      this.status = AccountStatus.anonymous;
      callback(true);
      this.email = undefined;
    }
  }

  getSession(callback: (session: CognitoUserSession | null) => void) {
    if (this.user) {
      this.user.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
          if (err) {
            callback(null);
          } else {
            callback(session);
          }
        }
      );
    } else {
      callback(null);
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
