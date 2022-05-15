import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Index from "../pages/index";

it("should render correct info for checkout page", async () => {
  render(<Index />);

  expect(screen.getByText(/best beer in the world./gi)).toBeVisible();
});
