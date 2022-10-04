import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author but not url or likes", () => {
  const blog = {
    title: "Lord of the rings",
    author: "J.R.R. Tolkien",
    url: "asdfg.com",
    likes: 62,
  };

  render(<Blog blog={blog} />);

  const titleAndAuthor = screen.getByText("Lord of the rings J.R.R. Tolkien");
  const url = screen.queryByText("asdfg.com");
  const likes = screen.queryByText("likes 62");

  expect(titleAndAuthor).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test("clicking the view button shows the url and the likes", async () => {
  const blog = {
    title: "Lord of the rings",
    author: "J.R.R. Tolkien",
    url: "asdfg.com",
    likes: 62,
  };

  render(<Blog blog={blog} />);

  const button = screen.getByText("view");

  const user = userEvent.setup();

  await user.click(button);

  const titleAndAuthor = screen.getByText("Lord of the rings J.R.R. Tolkien");
  const url = screen.getByText("asdfg.com");
  const likes = screen.getByText("likes 62");

  expect(titleAndAuthor).toBeDefined();
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test("function is called twice when like button is pressed twice", async () => {
  const blog = {
    title: "Lord of the rings",
    author: "J.R.R. Tolkien",
    url: "asdfg.com",
    likes: 62,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} incrementLikes={mockHandler} />);

  const viewButton = screen.getByText("view");

  const user = userEvent.setup();

  await user.click(viewButton);

  const likeButton = screen.getByText("like");

  await user.click(likeButton);

  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
