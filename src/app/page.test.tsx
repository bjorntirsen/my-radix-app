import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "next-themes";
import Home from "./page";

// Mock fetch
global.fetch = async () =>
  ({
    ok: true,
    json: async () => ({
      data: [
        {
          mal_id: 1,
          name: "Naruto Uzumaki",
          images: {
            jpg: { image_url: "/naruto.jpg" },
            webp: { image_url: "" },
          },
          about: "A ninja from Konoha.",
        },
      ],
    }),
  }) as unknown as Response;

// Mock window.matchMedia for next-themes
if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Helper wrapper to resolve the async component
async function renderHome() {
  const HomeResolved = await Home();
  return render(
    <ThemeProvider attribute="class">
      <TooltipProvider>{HomeResolved}</TooltipProvider>
    </ThemeProvider>,
  );
}

test("Home page renders character cards", async () => {
  await renderHome();

  expect(
    await screen.findByRole("heading", { name: "Naruto Uzumaki" }),
  ).toBeInTheDocument();
});
