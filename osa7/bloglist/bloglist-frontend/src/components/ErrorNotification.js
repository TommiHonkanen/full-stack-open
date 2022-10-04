import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const ErrorNotification = () => {
  const message = useSelector((state) => state.errorNotification);

  if (message === "") {
    return null;
  }

  return (
    <div>
      <Alert variant="danger">{message}</Alert>
    </div>
  );
};

export default ErrorNotification;
