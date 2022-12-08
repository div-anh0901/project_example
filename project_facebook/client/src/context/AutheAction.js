export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  paload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  paload: error,
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const UnFollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
