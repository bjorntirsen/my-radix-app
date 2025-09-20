import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { TooltipProvider } from "@radix-ui/react-tooltip";
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

// Helper wrapper to resolve the async component
async function renderHome() {
  const HomeResolved = await Home();
  return render(<TooltipProvider>{HomeResolved}</TooltipProvider>);
}

test("Home page renders character cards", async () => {
  await renderHome();

  expect(
    await screen.findByRole("heading", { name: "Naruto Uzumaki" }),
  ).toBeInTheDocument();
});
