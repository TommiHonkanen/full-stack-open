let timeoutId = null;

const notificationReducer = (state = "", action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    return action.notification;
  default:
    return state;
  }
};

export const setNotification = (notification, duration) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    });

    clearTimeout(timeoutId);
    timeoutId = null;

    timeoutId = setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: "",
      });
    }, duration * 1000);
  };
};

export default notificationReducer;
