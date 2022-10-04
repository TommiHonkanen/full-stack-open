import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateForm from "./CreateForm";

test("<CreateForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<CreateForm createBlog={createBlog} />);

  const inputs = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("create");

  await user.type(inputs[0], "tes test ss");
  await user.type(inputs[1], "Walter White");
  await user.type(inputs[2], "gasdf.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("tes test ss");
  expect(createBlog.mock.calls[0][0].author).toBe("Walter White");
  expect(createBlog.mock.calls[0][0].url).toBe("gasdf.com");
});
