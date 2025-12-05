import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../pages/Register"; 
import { BrowserRouter } from "react-router-dom";


jest.spyOn(console, "error").mockImplementation(() => {});

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock fetch
global.fetch = jest.fn();

// Mock alert
global.alert = jest.fn();

function renderUI() {
  return render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
}

describe("Register Component Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------------
  // 1️⃣ FIELD VALIDATIONS
  // ------------------------------
  test("shows error when first name is empty", async () => {
    renderUI();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(alert).toHaveBeenCalledWith("First name is required");
  });

  test("shows error when last name is empty", async () => {
    renderUI();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("First Name *"), "John");
    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(alert).toHaveBeenCalledWith("Last name is required");
  });

  test("shows error when email is empty", async () => {
    renderUI();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("First Name *"), "John");
    await user.type(screen.getByPlaceholderText("Last Name *"), "Doe");
    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(alert).toHaveBeenCalledWith("Email is required");
  });

  test("shows error when password is empty", async () => {
    renderUI();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("First Name *"), "John");
    await user.type(screen.getByPlaceholderText("Last Name *"), "Doe");
    await user.type(screen.getByPlaceholderText("Email *"), "john@mail.com");

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(alert).toHaveBeenCalledWith("Password is required");
  });

  test("shows error when password is < 6 characters", async () => {
    renderUI();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("First Name *"), "John");
    await user.type(screen.getByPlaceholderText("Last Name *"), "Doe");
    await user.type(screen.getByPlaceholderText("Email *"), "john@mail.com");
    await user.type(
      screen.getByPlaceholderText("Password * (min 6 chars)"),
      "123"
    );

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(alert).toHaveBeenCalledWith(
      "Password must be at least 6 characters"
    );
  });

  // ------------------------------
  // 2️⃣ USER ALREADY EXISTS
  // ------------------------------
  test("shows alert if user already exists", async () => {
    const existingUser = [{ email: "john@mail.com" }];

    fetch.mockResolvedValueOnce({
      json: async () => existingUser,
    });

    renderUI();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("First Name *"), "John");
    await user.type(screen.getByPlaceholderText("Last Name *"), "Doe");
    await user.type(screen.getByPlaceholderText("Email *"), "john@mail.com");
    await user.type(
      screen.getByPlaceholderText("Password * (min 6 chars)"),
      "123456"
    );

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(alert).toHaveBeenCalledWith(
      "User already exists. Please login."
    );
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  // ------------------------------
  // 3️⃣ SUCCESSFUL REGISTRATION
  // ------------------------------
  test("successful registration navigates to login", async () => {
    // First call → check existing user
    fetch.mockResolvedValueOnce({
      json: async () => [], // user NOT found
    });

    // Second call → POST request
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    renderUI();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("First Name *"), "John");
    await user.type(screen.getByPlaceholderText("Last Name *"), "Doe");
    await user.type(screen.getByPlaceholderText("Email *"), "john@mail.com");
    await user.type(
      screen.getByPlaceholderText("Password * (min 6 chars)"),
      "123456"
    );

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(alert).toHaveBeenCalledWith("Registration successful!");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  // ------------------------------
  // 4️⃣ SERVER FAILURE DURING REGISTER
  // ------------------------------
  test("shows error when registration API fails", async () => {
    // user not exists
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    // POST returns error
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    renderUI();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("First Name *"), "John");
    await user.type(screen.getByPlaceholderText("Last Name *"), "Doe");
    await user.type(screen.getByPlaceholderText("Email *"), "john@mail.com");
    await user.type(
      screen.getByPlaceholderText("Password * (min 6 chars)"),
      "123456"
    );

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(alert).toHaveBeenCalledWith(
      "Something went wrong during registration!"
    );
  });

  // ------------------------------
  // 5️⃣ CLICK "LOGIN" LINK
  // ------------------------------
  test("navigates to login on clicking Login text", async () => {
    renderUI();
    const user = userEvent.setup();

    await user.click(screen.getByText("Login"));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
