let timeoutId = null;

const errorNotificationReducer = (state = "", action) => {
  switch (action.type) {
  case "SET_ERRORNOTIFICATION":
    return action.errorNotification;
  default:
    return state;
  }
};

export const setErrorNotification = (errorNotification, duration) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_ERRORNOTIFICATION",
      errorNotification,
    });

    clearTimeout(timeoutId);
    timeoutId = null;

    timeoutId = setTimeout(() => {
      dispatch({
        type: "SET_ERRORNOTIFICATION",
        errorNotification: "",
      });
    }, duration * 1000);
  };
};

export default errorNotificationReducer;
