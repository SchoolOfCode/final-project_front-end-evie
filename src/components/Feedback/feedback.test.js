import { render, screen } from "@testing-library/react";
import Feedback from "./feedback";

test("renders Map link", () => {
  render(<Feedback />);
  const linkElement = screen.getByText(/Map/i);
  expect(linkElement).toBeInTheDocument();
});

test("button rendered sucessfully", () => {
  render(<input label={"Submit Review"} />);
  const input = screen.getByText("Submit Review");
  expect(input).toBeInTheDocument();
});
