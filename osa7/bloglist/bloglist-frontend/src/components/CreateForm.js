import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleCreation = async (event) => {
    event.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url,
    };
    createBlog(blog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleCreation}>
        <Form.Group>
          <Form.Label>title: </Form.Label>
          <Form.Control
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          <Form.Label>author: </Form.Label>
          <Form.Control
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
          <Form.Label>url: </Form.Label>
          <Form.Control
            id="url"
            type="text"
            name="title"
            value={url}
            onChange={handleUrlChange}
          />
          <Button variant="primary" id="create" type="submit">
            create
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

CreateForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default CreateForm;
