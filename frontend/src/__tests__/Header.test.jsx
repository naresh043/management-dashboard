import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../components/layout/Headder"; // adjust path
import { AuthContext } from "../context/AuthContext";

// Helper: render with mock auth context
function renderWithAuth(ui, contextValue) {
  return render(
    <AuthContext.Provider value={contextValue}>
      {ui}
    </AuthContext.Provider>
  );
}

describe("Header Component", () => {

  test("renders dashboard title", () => {
    renderWithAuth(<Header />, { isAuth: false, logout: jest.fn() });

    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });

  test("shows logout button when user is authenticated", () => {
    renderWithAuth(<Header />, { isAuth: true, logout: jest.fn() });

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  test("hides logout button when user is NOT authenticated", () => {
    renderWithAuth(<Header />, { isAuth: false, logout: jest.fn() });

    expect(screen.queryByRole("button", { name: /logout/i })).not.toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", async () => {
    const mockLogout = jest.fn();
    const user = userEvent.setup();

    renderWithAuth(<Header />, { isAuth: true, logout: mockLogout });

    const logoutBtn = screen.getByRole("button", { name: /logout/i });

    await user.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
