export const SET_USER_INFO = "SET_USER_INFO";

export const setUserInfo = (name, email) => {
  return {
    type: SET_USER_INFO,
    payload: {
      name: name,
      email: email,
    },
  };
};
