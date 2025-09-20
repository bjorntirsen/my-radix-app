import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Header from "./header";

vi.mock("./theme-toggle", () => ({
  default: () => <div data-testid="theme-toggle" />,
}));

test("Header renders title and theme toggle", () => {
  render(<Header />);

  // Check for the app title
  expect(screen.getByText("My Radix App")).toBeInTheDocument();

  // Check for the theme toggle
  expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
});
