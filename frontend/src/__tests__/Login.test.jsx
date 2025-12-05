import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login"; 
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

// -------- MOCK useNavigate ----------
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// -------- MOCK fetch ----------
global.fetch = jest.fn();

// -------- MOCK alert ----------
global.alert = jest.fn();

// -------- MOCK localStorage ----------
jest.spyOn(Storage.prototype, "setItem");

function renderWithContext(ui, contextValue = { login: jest.fn() }) {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={contextValue}>
        {ui}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

describe("Login Component Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form UI", () => {
    renderWithContext(<Login />);

    expect(
      screen.getByRole("heading", { name: /login/i })
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Email *")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password *")).toBeInTheDocument();
  });

  test("shows alert when email is empty", async () => {
    renderWithContext(<Login />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(alert).toHaveBeenCalledWith("Email is required");
  });

  test("shows alert when password is empty", async () => {
    renderWithContext(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email *"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(alert).toHaveBeenCalledWith("Password is required");
  });

  test("successful login calls login(), stores user and navigates", async () => {
    const fakeUser = [{ id: 1, email: "test@example.com" }];

    fetch.mockResolvedValue({
      ok: true,
      json: async () => fakeUser,
    });

    const mockLogin = jest.fn();
    renderWithContext(<Login />, { login: mockLogin });

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email *"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Password *"), "12345");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(fetch).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(mockLogin).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("shows alert when invalid credentials", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    renderWithContext(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email *"), "wrong@mail.com");
    await user.type(screen.getByPlaceholderText("Password *"), "wrong");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(alert).toHaveBeenCalledWith("Email or password is incorrect");
  });

  test("navigates to register page", async () => {
    renderWithContext(<Login />);
    const user = userEvent.setup();

    await user.click(screen.getByText("Register"));

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
