import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "./page";

test("Home page", () => {
  render(<Home />);
  const main = within(screen.getByRole("main"));

  // Check for Next.js logo
  expect(main.getByRole("img", { name: /next\.js logo/i })).toBeDefined();

  // Check for the editing instruction text
  expect(main.getByText(/get started by editing/i)).toBeDefined();
  expect(main.getByText("src/app/page.tsx")).toBeDefined();

  // Check for main action buttons
  expect(main.getByRole("link", { name: /deploy now/i })).toBeDefined();
  expect(main.getByRole("link", { name: /read our docs/i })).toBeDefined();

  // Check footer links
  const footer = within(screen.getByRole("contentinfo"));
  expect(footer.getByRole("link", { name: /learn/i })).toBeDefined();
  expect(footer.getByRole("link", { name: /examples/i })).toBeDefined();
  expect(
    footer.getByRole("link", { name: /go to nextjs\.org/i }),
  ).toBeDefined();
});
