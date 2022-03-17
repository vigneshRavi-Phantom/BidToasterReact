import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { getItem, setItem } from "utils/CommonUtils";
import { isSuccess } from "utils/ServiceAPIUtil";
import { useApolloClient, useMutation } from "@apollo/client";
import {
  LOGIN_QUERY,
  REFRESH_TOKEN_QUERY,
  FORGOT_PASSWORD_QUERY,
  RESET_PASSWORD_QUERY,
  PASSWORD_RESET_TOKEN_VALID_QUERY,
} from "graphql/auth";
import {
  SIGNUP_QUERY,
  VENDOR_SIGNUP_QUERY,
  ACCOUNT_PROFILE_QUERY,
} from "graphql/users";
import jwt from "jsonwebtoken";
import { JWTToken } from "config/constant";
import { UserAccessType, USER_TYPE } from "helpers/interfaces";
import { StringMap } from "helpers/interfaces";
import { useCookies } from 'react-cookie';

export interface UserState {
  userType: USER_TYPE;
  error?: Error;
  accessToken?: string;
  userAccessType: UserAccessType;
  accountProfile?: StringMap;
  refetchAccountProfile: () => Promise<any>;
  signup: ({
    userAccessType,
    firstName,
    lastName,
    email,
    phoneNumber,
    organizationName,
    organizationType,
    natureOfBusiness,
    companyRegistrationNo,
    password,
  }: {
    userAccessType: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    organizationName: string;
    organizationType: string;
    natureOfBusiness: string;
    companyRegistrationNo: string;
    password: string;
  }) => Promise<any>;
  vendorSignup: (formValues: any) => Promise<any>;
  login: ({
    username,
    password,
    rememberMe
  }: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<any>;
  forgotPassword: ({ email }: { email: string }) => Promise<any>;
  resetPassword: ({
    token,
    oldPassword,
    password,
  }: {
    token: string;
    oldPassword?: string;
    password: string;
  }) => Promise<any>;
  isPasswordResetTokenValid: ({ token }: { token: string }) => Promise<any>;
  refreshToken: (tokenData: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const initialState: UserState = {
  userType: "INIT",
  error: undefined,
  accessToken: undefined,
  userAccessType: "buyer",
  refetchAccountProfile: async () => {},
  signup: async () => {},
  vendorSignup: async () => {},
  login: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  isPasswordResetTokenValid: async () => {},
  refreshToken: async () => {},
  logout: async () => {},
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apolloClient = useApolloClient();
  const [userSignup] = useMutation(SIGNUP_QUERY);
  const [userVendorSignup] = useMutation(VENDOR_SIGNUP_QUERY);
  // const [currentAccessToken, setCurrentAccessToken] = useState("");

  const controlReducer = (_state: UserState, action: any): UserState => {
    switch (action.name) {
      case "LOG_IN":
        return {
          ..._state,
          userType: "LOGGED_IN",
          error: undefined,
          accessToken: action.accessToken,
          userAccessType: action.userAccessType,
          accountProfile: action.accountProfile,
        };
      case "LOG_IN_ERROR":
        return {
          ..._state,
          userType: "INIT",
          error: action.value,
        };
      case "LOG_OUT": {
        return {
          ..._state,
          userType: "NOT_LOGGED_IN",
          accessToken: "",
          error: undefined,
        };
      }
      case "UPDATE_ACCOUNT_PROFILE": {
        return {
          ..._state,
          accountProfile: action.accountProfile,
        };
      }
      default:
        return {
          ..._state,
        };
    }
  };

  const [state, dispatch] = useReducer(controlReducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const authCheck = async () => {
      try {
        const tokenData = await getItem("bt.token");
        if (tokenData !== undefined && tokenData !== null) {
          const tokenObj = JSON.parse(tokenData);
          await authActions.refreshToken(tokenObj.accessToken);
          // await doLogin(tokenObj);
        } else {
          await doLogout();
        }
      } catch {
        await doLogout();
      }
    };
    authCheck();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doLogin = async (response: { accessToken: string }) => {
    const accessToken = response.accessToken;
    const accessTokenDecrypt = jwt.verify(accessToken, JWTToken);
    const userAccessType =
      typeof accessTokenDecrypt === "object"
        ? accessTokenDecrypt.userAccessType
        : "";
    const payload = JSON.stringify({ accessToken });
    await setItem("bt.token", payload);
    // setCurrentAccessToken(accessToken);

    dispatch({
      name: "LOG_IN",
      accessToken: accessToken,
      userAccessType: userAccessType,
      accountProfile: {},
    });
    await getAccountProfile(accessToken);
  };

  const doLogout = useCallback(async () => {
    await setItem("bt.token", "");
    // setCurrentAccessToken("");
    dispatch({ name: "LOG_OUT" });
  }, []);

  const getAccountProfile = useCallback(async (accessToken: string) => {
    const { data } = await apolloClient.query({
      query: ACCOUNT_PROFILE_QUERY,
      variables: { input: { accessToken } },
    });
    if (isSuccess("getAccountProfile", data)) {
      dispatch({
        name: "UPDATE_ACCOUNT_PROFILE",
        accountProfile: data.getAccountProfile.data[0],
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [cookies, setCookie, removeCookie] = useCookies<any>(['loginUser']);
  const authActions = React.useMemo(
    () => ({
      refetchAccountProfile: async () => {
        if (state.accessToken) await getAccountProfile(state.accessToken);
      },
      login: async ({
        username,
        password,
        rememberMe
      }: {
        username: string;
        password: string;
        rememberMe: boolean;
      }) => {
        const { data } = await apolloClient.query({
          query: LOGIN_QUERY,
          variables: { input: { username, password } },
          fetchPolicy: "no-cache",
        });
        if (isSuccess("login", data)) {
          if(rememberMe){
            setCookie('username', username, { path: '/' });
            setCookie('password', password, { path: '/' });
          } else {
            removeCookie('username');
            removeCookie('password');
          }
          await doLogin(data.login.data);
        }
      },

      forgotPassword: async ({ email }: { email: string }) => {
        const { data } = await apolloClient.query({
          query: FORGOT_PASSWORD_QUERY,
          variables: { input: { email } },
        });
        if (isSuccess("forgotPassword", data)) {
          return data.forgotPassword.data;
        }
      },

      resetPassword: async ({
        token,
        oldPassword,
        password,
      }: {
        token: string;
        oldPassword?: string;
        password: string;
      }) => {
        const { data } = await apolloClient.query({
          query: RESET_PASSWORD_QUERY,
          variables: {
            input: { token, password, oldPassword: oldPassword || "" },
          },
        });
        if (isSuccess("resetPassword", data)) {
          return data.resetPassword.data;
        }
      },
      isPasswordResetTokenValid: async ({ token }: { token: string }) => {
        const { data } = await apolloClient.query({
          query: PASSWORD_RESET_TOKEN_VALID_QUERY,
          variables: { input: { token } },
        });
        if (isSuccess("passwordResetTokenValid", data)) {
          return data.passwordResetTokenValid.data;
        }
      },

      signup: async (formValues: any) => {
        const { data } = await userSignup({
          variables: { input: formValues },
        });

        if (isSuccess("signup", data)) {
          await authActions.login({
            username: formValues.email,
            password: formValues.password,
            rememberMe:false
          });
        }
      },
      vendorSignup: async (formValues: any) => {
        const { data } = await userVendorSignup({
          variables: { input: formValues },
        });

        if (isSuccess("vendorSignup", data)) {
          await authActions.login({
            username: formValues.email,
            password: formValues.password,
            rememberMe:false
          });
        }
      },

      refreshToken: async (accessToken: string) => {
        const { data } = await apolloClient.query({
          query: REFRESH_TOKEN_QUERY,
          variables: { input: { accessToken } },
        });
        if (isSuccess("refreshToken", data)) {
          await doLogin(data.refreshToken.data);
        } else {
          authActions.logout();
        }
      },

      logout: async () => {
        await doLogout();
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  let authChildren = children;
  if (state.userType === "LOGGED_IN" && !state.accountProfile) {
    authChildren = null;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        ...authActions,
      }}
    >
      {authChildren}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContext");
  }
  return context;
};
