import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../../components/layout/header/Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test("should render the site title", () => {
    const heading = screen.getByRole("heading", { name: /code life/i });
    expect(heading).toBeInTheDocument();
  });

  test("should render navigation links", () => {
    const homeLink = screen.getByRole("link", { name: /home/i });
    const portfolioLink = screen.getByRole("link", { name: /portfolio/i });
    const contactLink = screen.getByRole("link", { name: /contact/i });

    expect(homeLink).toBeInTheDocument();
    expect(portfolioLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  test("navigation links should have correct href attributes", () => {
    const homeLink = screen.getByRole("link", { name: /home/i });
    const portfolioLink = screen.getByRole("link", { name: /portfolio/i });
    const contactLink = screen.getByRole("link", { name: /contact/i });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(portfolioLink).toHaveAttribute("href", "/");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });
});
