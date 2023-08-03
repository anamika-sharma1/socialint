export const login_start = (userCredentials) => {
  return {
    type: "LOGIN_START",
  };
};

export const login_process = (userCredentials) => {
  return {
    type: "LOGIN_PROCESS",
    payload: userCredentials,
  };
};

export const login_error = (error) => {
  return {
    type: "LOGIN_ERROR",
    payload: error,
  };
};

export const Follow = (userId) => {
  return {
    type: "FOLLOW",
    payload: userId,
  };
};

export const Unfollow = (userId) => {
  return {
    type: "UNFOLLOW",
    payload: userId,
  };
};
