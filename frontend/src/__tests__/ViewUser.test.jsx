import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ViewUser from "../pages/ViewUser"; // adjust path
import { act } from "react-dom/test-utils";

// Prevent noisy console errors
jest.spyOn(console, "error").mockImplementation(() => {});

// ---------------- MOCK REACT ROUTER ----------------
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "10" }),
}));

// ---------------- MOCK PRIMEREACT ----------------
jest.mock("primereact/card", () => ({
  Card: ({ children }) => (
    <div data-testid="mock-card">{children}</div>
  ),
}));

jest.mock("primereact/dialog", () => ({
  Dialog: ({ visible, children }) =>
    visible ? <div data-testid="edit-dialog">{children}</div> : null,
}));

// ---------------- MOCK EditUserForm ----------------
jest.mock("../utils/EditUserForm", () => ({
  __esModule: true,
  default: ({ onSuccess }) => (
    <button data-testid="edit-user-form" onClick={onSuccess}>
      Mock Edit User Form
    </button>
  ),
}));

// ---------------- MOCK FETCH ----------------
global.fetch = jest.fn();

function mockFetch(data, ok = true) {
  fetch.mockResolvedValueOnce({
    ok,
    json: async () => data,
  });
}

describe("ViewUser Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------------
  // 1️⃣ Loading State
  // ------------------------------
  test("shows loading message initially", async () => {
    mockFetch({}); // for initial call

    render(<ViewUser />);

    expect(screen.getByText("Loading user...")).toBeInTheDocument();

    await act(async () => {});
  });

  // ------------------------------
  // 2️⃣ Error State
  // ------------------------------
  test("shows error message if user not found", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<ViewUser />);

    await act(async () => {});

    expect(screen.getByText("User not found")).toBeInTheDocument();
  });

  // ------------------------------
  // 3️⃣ Successful Fetch & Display of User Info
  // ------------------------------
  test("renders user details correctly", async () => {
    const user = {
      id: 10,
      firstName: "Clark",
      lastName: "Kent",
      email: "superman@dailyplanet.com",
      role: "Reporter",
      contactNumber: "1234567890",
    };

    mockFetch(user);

    render(<ViewUser />);

    await act(async () => {});

    expect(screen.getByText("Clark Kent")).toBeInTheDocument();
    expect(screen.getByText("User ID: 10")).toBeInTheDocument();
    expect(screen.getByText("superman@dailyplanet.com")).toBeInTheDocument();
    expect(screen.getByText("Reporter")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
  });

  // ------------------------------
  // 4️⃣ Clicking Pencil Icon Opens Dialog
  // ------------------------------
  test("opens edit dialog when clicking pencil icon", async () => {
    const user = {
      id: 10,
      firstName: "Clark",
      lastName: "Kent",
      email: "superman@dailyplanet.com",
      role: "Reporter",
      contactNumber: "1234567890",
    };

    mockFetch(user);

    render(<ViewUser />);

    await act(async () => {});

    const userObj = userEvent.setup();
    const editBtn = document.querySelector("button"); // pencil btn is first button

    await userObj.click(editBtn);

    expect(screen.getByTestId("edit-dialog")).toBeInTheDocument();
    expect(screen.getByTestId("edit-user-form")).toBeInTheDocument();
  });

  // ------------------------------
  // 5️⃣ onSuccess refreshes user data
  // ------------------------------
  test("refreshes user details after editing", async () => {
    // First fetch
    mockFetch({
      id: 10,
      firstName: "Clark",
      lastName: "Kent",
      email: "superman@dailyplanet.com",
      role: "Reporter",
      contactNumber: "1111",
    });

    // Second fetch after edit success
    mockFetch({
      id: 10,
      firstName: "Clark",
      lastName: "Kent",
      email: "superman@dailyplanet.com",
      role: "Reporter",
      contactNumber: "9999",
    });

    render(<ViewUser />);

    await act(async () => {});

    const userObj = userEvent.setup();
    const editBtn = document.querySelector("button");

    await userObj.click(editBtn);

    // Click mock form which calls onSuccess
    await userObj.click(screen.getByTestId("edit-user-form"));

    await act(async () => {});

    expect(screen.getByText("9999")).toBeInTheDocument();
  });
});
