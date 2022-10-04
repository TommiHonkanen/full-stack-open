import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification.js";
import ErrorNotification from "./components/ErrorNotification.js";
import LoginForm from "./components/Login.js";
import Togglable from "./components/Togglable.js";
import CreateForm from "./components/CreateForm";
import { setNotification } from "./reducers/notificationReducer";
import { setErrorNotification } from "./reducers/errorNotificationReducer";
import { Table, Button } from "react-bootstrap";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(setNotification(`Welcome back ${user.name}!`, 3));
    } catch (exception) {
      dispatch(setErrorNotification("wrong username or password", 3));
    }
  };

  const incrementLikes = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };

    if (blog.user !== undefined) {
      changedBlog.user = blog.user.id;
    }

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(
          blogs.map((blog) =>
            blog.id !== id ? blog : { ...returnedBlog, user: blog.user }
          )
        );
      })
      .catch(() => {
        dispatch(
          setErrorNotification(
            `Blog '${blog.title}' was already removed from the server`,
            3
          )
        );
        setBlogs(blogs.filter((b) => b.id !== id));
      });
  };

  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      createFormRef.current.toggleVisibility();
      dispatch(setNotification(`A new blog ${blogObject.title} added`, 3));
    } catch (error) {
      dispatch(setErrorNotification("Blog creation failed", 3));
    }
  };

  const removeBlog = async (id) => {
    try {
      const blog = blogs.find((b) => b.id === id);
      if (!window.confirm(`Remove blog ${blog.title}?`)) {
        return;
      }
      await blogService.remove(id);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      dispatch(setNotification("Blog successfully removed", 3));
    } catch (exception) {
      dispatch(setErrorNotification("Blog deletion failed", 3));
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setUsername("");
    setPassword("");
    dispatch(setNotification("Logged out successfully", 3));
  };

  const blogForm = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {user.name} logged in{" "}
        <Button variant="danger" onClick={logOut}>
          log out
        </Button>
        <br />
        <br />
        <Table striped>
          <tbody>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Blog
                      key={blog.id}
                      blog={blog}
                      incrementLikes={() => incrementLikes(blog.id)}
                      remove={() => removeBlog(blog.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  const createFormRef = useRef();

  const createForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={createFormRef}>
        <CreateForm createBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div className="container">
      <Notification />
      <ErrorNotification />

      {user === null && loginForm()}
      {user !== null && blogForm()}
      {user !== null && createForm()}
    </div>
  );
};

export default App;
