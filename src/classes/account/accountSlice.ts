import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserSession,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { makeAutoObservable, runInAction } from "mobx";
import poolData from "../../const/account/userPool";

export enum AccountPanelStage {
  loginAccount = 1,
  forgetPassword = 2,
  changeAccount = 3,
}

export enum AccountStatus {
  login = 1,
  anonymous = 2,
}

class AccountSlice {
  pool: CognitoUserPool;
  user: CognitoUser | null;
  authDetails?: AuthenticationDetails;
  status: AccountStatus;
  stage: AccountPanelStage;

  constructor() {
    this.pool = new CognitoUserPool(poolData);
    this.user = null;
    this.status = AccountStatus.anonymous;
    this.stage = AccountPanelStage.loginAccount;

    makeAutoObservable(this);
  }

  signUpAccountWithCognito(
    email: string,
    password: string,
    callback: (isSuccess: boolean) => void
  ) {
    this.pool.signUp(email, password, [], [], (err) => {
      callback(err === undefined);
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

  async authAccountWithCognito(
    email: string,
    password: string,
    callback: (isSuccess: boolean) => void
  ) {
    return await new Promise<CognitoUserSession | undefined>(() => {
      if (this.user && email !== "" && password !== "") {
        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });
        this.user.authenticateUser(authDetails, {
          onSuccess: (session: CognitoUserSession) => {
            runInAction(() => {
              this.status = AccountStatus.login;
            });
            callback(true);
          },
          onFailure: (err: any) => {
            runInAction(() => {
              this.status = AccountStatus.anonymous;
            });
            callback(false);
          },
        });
      } else {
        runInAction(() => {
          console.log("!!!!!!!!!!!!!!");
          this.status = AccountStatus.anonymous;
        });

        callback(true);
      }
    });
  }

  changeAccountWithCognito(data: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }) {
    this.getSession().then((session) => {
      if (session && this.user) {
        if (data.email !== "") {
          this.user.updateAttributes(
            [new CognitoUserAttribute({ Name: "email", Value: data.email })],
            (err, result) => {
              if (err) {
                console.log("!!!err", err);
              } else {
                console.log("!!!result", result);
              }
            }
          );
        }

        if (data.newPassword !== "" && data.oldPassword !== "") {
          this.user.changePassword(
            data.oldPassword,
            data.newPassword,
            (err, result) => {
              if (err) {
                console.log("!!!err", err);
              } else {
                console.log("!!!result", result);
              }
            }
          );
        }
      }
    });
  }

  async forgetAccountPasswordWithCognito(
    email: string,
    callback: (isSuccess: boolean) => void
  ): Promise<boolean> {
    return await new Promise(() => {
      this.user = new CognitoUser({
        Username: email,
        Pool: this.pool,
      });

      this.user.forgotPassword({
        onSuccess: (data) => {
          callback(true);
        },
        onFailure: (err) => {
          callback(false);
        },
      });
    });
  }

  async confirmAccountPasswordWithCognito(
    code: string,
    newPassword: string,
    callback: (isSuccess: boolean) => void
  ): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      if (this.user) {
        this.user.confirmPassword(code, newPassword, {
          onSuccess: (data) => {
            callback(true);
          },
          onFailure: (err) => {
            callback(false);
          },
        });
      } else {
        callback(false);
      }
    });
  }

  async getSession() {
    return await new Promise<CognitoUserSession | undefined>(
      (resolve, reject) => {
        if (this.user) {
          this.user.getSession(
            (err: Error | null, session: CognitoUserSession) => {
              if (err) {
                resolve(undefined);
              } else {
                resolve(session);
              }
            }
          );
        } else {
          resolve(undefined);
        }
      }
    );
  }
}

export default AccountSlice;
