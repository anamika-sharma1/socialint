export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        token: null,
      };
    case "LOGIN_PROCESS":
      return {
        user: action.payload.user,
        isFetching: false,
        error: false,
        token: "Bearer " + action.payload.token,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
        token: null,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter((id) => id !== action.payload),
        },
      };
    case "UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          desc: action.payload?.desc ? action.payload?.desc : state.user.desc,
          city: action.payload?.city ? action.payload?.city : state.user.city,
          from: action.payload?.from ? action.payload?.from : state.user.from,
          relationship: action.payload?.relationship
            ? action.payload?.relationship
            : state.user.relationship,
          profilePicture: action.payload?.profilePicture
            ? action.payload?.profilePicture
            : state.user.profilePicture,
          coverPicture: action.payload?.coverPicture
            ? action.payload?.coverPicture
            : state.user.coverPicture,
        },
      };
    default:
      return state;
  }
};
