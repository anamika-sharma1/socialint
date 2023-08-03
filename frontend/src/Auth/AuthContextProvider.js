import { AuthReducer } from "./AuthReducer";
import { createContext, useReducer, useState } from "react";
import { useEffect } from "react";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
  token: null,
};

const getState = () => {
  const state = JSON.parse(sessionStorage.getItem("state"));
  if (state) {
    return state;
  } else {
    return INITIAL_STATE;
  }
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
  let x = getState();
  const [state, dispatch] = useReducer(AuthReducer, x);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    sessionStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        token: state.token,
        theme,
        setTheme,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
