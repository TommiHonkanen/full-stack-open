import { useState } from "react";
import { Table, Button } from "react-bootstrap";

const Blog = ({ blog, incrementLikes, remove }) => {
  const [showEverything, setShowEverything] = useState(false);

  if (showEverything) {
    if (blog.user === undefined) {
      return (
        <div className="blog">
          <Table>
            <tbody>
              <tr>
                <td>
                  {blog.title} {blog.author}
                  <Button
                    variant="secondary"
                    onClick={() => setShowEverything(false)}
                  >
                    hide
                  </Button>{" "}
                </td>
              </tr>
              <tr>
                <td>
                  <span>{blog.url}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>likes {blog.likes}</span>
                  <Button id="likebutton" onClick={incrementLikes}>
                    like
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    } else {
      return (
        <div className="blog">
          <Table>
            <tbody>
              <tr>
                <td>
                  {blog.title} {blog.author}
                  <Button
                    variant="secondary"
                    onClick={() => setShowEverything(false)}
                  >
                    hide
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <span>{blog.url}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>likes {blog.likes}</span>
                  <Button id="likebutton" onClick={incrementLikes}>
                    like
                  </Button>
                </td>
              </tr>
              <tr>
                <td>{blog.user.name}</td>
              </tr>
              <tr>
                <td>
                  <Button variant="danger" id="removebutton" onClick={remove}>
                    remove
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    }
  } else {
    return (
      <div className="blog">
        {blog.title} {blog.author}
        <Button variant="secondary" onClick={() => setShowEverything(true)}>
          view
        </Button>
      </div>
    );
  }
};

export default Blog;
