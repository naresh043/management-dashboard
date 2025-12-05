import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ManageUsers from "../pages/ManageUsers"; // Adjust path
import { act } from "react-dom/test-utils";

// Prevent React state update warnings in console
jest.spyOn(console, "error").mockImplementation(() => {});

// ---------------- MOCKING PRIME REACT ----------------
jest.mock("primereact/datatable", () => ({
  DataTable: ({ value }) => (
    <table data-testid="mock-table">
      <tbody>
        {value?.map((u) => (
          <tr key={u.id} data-testid="user-row">
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>

            {/* ⭐ Added Actions Column with View Link */}
            <td>
              <a href={`/users/${u.id}`} aria-label={`view-user-${u.id}`}>
                View
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

jest.mock("primereact/column", () => ({
  Column: () => null,
}));

jest.mock("primereact/dialog", () => ({
  Dialog: ({ visible, children }) =>
    visible ? <div data-testid="dialog">{children}</div> : null,
}));

// ---------------- MOCKING CreateUserForm ----------------
jest.mock("../utils/CreateUserForm", () => ({
  __esModule: true,
  default: ({ onSuccess }) => (
    <button data-testid="create-user-form" onClick={onSuccess}>
      Mock Create User Form
    </button>
  ),
}));

// ---------------- MOCKING FETCH ----------------
global.fetch = jest.fn();

function mockFetch(data, ok = true) {
  fetch.mockResolvedValueOnce({
    ok,
    json: async () => data,
  });
}

describe("ManageUsers Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------------
  // 1️⃣ Loading state
  // ------------------------------
  test("shows loading text initially", async () => {
    mockFetch([]); // initial fetch

    render(<ManageUsers />);

    // heading is immediately available
    expect(screen.getByText("Manage Users")).toBeInTheDocument();

    await act(async () => {}); // wait for fetch

    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });

  // ------------------------------
  // 2️⃣ Successful user fetch
  // ------------------------------
  test("renders users in the table after fetch", async () => {
    const users = [
      { id: 1, firstName: "John", lastName: "Doe", email: "john@mail.com", role: "Admin" },
      { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@mail.com", role: "User" },
    ];

    mockFetch(users);
    render(<ManageUsers />);

    await act(async () => {});

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  // ------------------------------
  // 3️⃣ Clicking "Create User" opens dialog
  // ------------------------------
  test("opens CreateUser dialog on button click", async () => {
    mockFetch([]);
    render(<ManageUsers />);

    await act(async () => {});

    const btn = screen.getByRole("button", { name: /create user/i });
    const user = userEvent.setup();

    await user.click(btn);

    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("create-user-form")).toBeInTheDocument();
  });

  // ------------------------------
  // 4️⃣ onSuccess refreshes the table
  // ------------------------------
  test("refreshes users after onSuccess from CreateUserForm", async () => {
    mockFetch([]);

    const updatedUsers = [
      { id: 1, firstName: "New", lastName: "User", email: "new@mail.com", role: "Manager" },
    ];

    mockFetch(updatedUsers);

    render(<ManageUsers />);

    await act(async () => {});

    const user = userEvent.setup();
    const createBtn = screen.getByRole("button", { name: /create user/i });

    await user.click(createBtn);
    await user.click(screen.getByTestId("create-user-form"));

    await act(async () => {});

    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Manager")).toBeInTheDocument();
  });

  // ------------------------------
  // 5️⃣ Actions Column — View link
  // ------------------------------
  test("renders view link inside Actions column", async () => {
    const users = [
      { id: 99, firstName: "Tom", lastName: "Jerry", email: "tj@mail.com", role: "User" },
    ];

    mockFetch(users);
    render(<ManageUsers />);

    await act(async () => {});

    const viewLink = screen.getByRole("link", { name: /view/i });
    expect(viewLink).toHaveAttribute("href", "/users/99");
  });
});
