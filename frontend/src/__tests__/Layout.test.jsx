import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Layout from "../components/layout/Layout"; // correct
import { Outlet } from "react-router-dom";

// -------------------- MOCK CHILD COMPONENTS --------------------

// ❗ FIXED PATH BELOW
jest.mock("../components/layout/Sidebar", () => ({
  __esModule: true,
  default: ({ open, toggle }) => (
    <div data-testid="mock-sidebar">
      Sidebar is {open ? "Open" : "Closed"}
      <button onClick={toggle} data-testid="sidebar-toggle">
        Toggle Sidebar
      </button>
    </div>
  ),
}));

jest.mock("../components/layout/Headder", () => ({
  __esModule: true,
  default: ({ toggleSidebar }) => (
    <div data-testid="mock-header">
      Header
      <button data-testid="header-toggle" onClick={toggleSidebar}>
        Toggle
      </button>
    </div>
  ),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div data-testid="mock-outlet">Outlet Content</div>,
}));

// -------------------- TEST CASES --------------------

describe("Layout Component", () => {
  test("renders Sidebar, Header, and Outlet", () => {
    render(<Layout />);

    expect(screen.getByTestId("mock-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });

  test("sidebar is closed by default", () => {
    render(<Layout />);
    expect(screen.getByText(/Sidebar is Closed/i)).toBeInTheDocument();
  });

  test("header toggle button opens sidebar", async () => {
    const user = userEvent.setup();

    render(<Layout />);

    await user.click(screen.getByTestId("header-toggle"));
    expect(screen.getByText(/Sidebar is Open/i)).toBeInTheDocument();
  });

  test("sidebar toggle button closes sidebar", async () => {
    const user = userEvent.setup();

    render(<Layout />);

    await user.click(screen.getByTestId("header-toggle"));
    expect(screen.getByText(/Sidebar is Open/i)).toBeInTheDocument();

    await user.click(screen.getByTestId("sidebar-toggle"));
    expect(screen.getByText(/Sidebar is Closed/i)).toBeInTheDocument();
  });
});
