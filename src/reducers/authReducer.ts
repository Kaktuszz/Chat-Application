export const authReducer = (
  state = { authData: null, loading: false, error: false },
  action: any
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "UPLOAD_START":
      return { ...state, updateLoading: true, error: false };
    case "UPDATE_SUCCESS":
      localStorage.setItem('profile', JSON.stringify({...action?.data}))
      return { ...state, authData: action.data, updateLoading: false, error: false };
    case "UPDATE_FAIL":
      return { ...state, updateLoading: false, error: true };
    default:
      return state;
  }
};
