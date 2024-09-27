import { FETCH_USER_LOGIN_SUCCESS } from "../../redux/action/userAction";
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      console.log(action);
      return {
        ...state,
        account: {
          access_token: action?.payload?.data?.DT?.access_token,
          refresh_token: action?.payload?.data?.DT?.refresh_token,
          username: action?.payload?.data?.DT?.username,
          image: action?.payload?.data?.DT?.image,
          role: action?.payload?.data?.DT?.role,
        },
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default userReducer;
