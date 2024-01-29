import React, { createContext } from "react";
import AccountSlice from "../../classes/account/accountSlice";

export const defaultAccountSlice = new AccountSlice();
export const AccountContext = createContext<accountContext>({
  accountSlice: defaultAccountSlice,
});

export type accountContext = { accountSlice: AccountSlice };
