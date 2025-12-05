import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ManageRoles from "../pages/ManageRoles"; // adjust path
import { act } from "react-dom/test-utils";


jest.spyOn(console, "error").mockImplementation(() => {});
// ---------------- MOCKING PRIMEREACT ----------------
jest.mock("primereact/datatable", () => ({
  DataTable: ({ value }) => (
    <table data-testid="mock-table">
      {value?.map((r) => (
        <tr key={r.id}>
          <td>{r.id}</td>
          <td>{r.name}</td>
          <td>{r.description}</td>
        </tr>
      ))}
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

// Mock CreateRoleForm
jest.mock("../utils/CreateRoleForm", () => ({
  __esModule: true,
  default: ({ onSuccess }) => (
    <button onClick={onSuccess} data-testid="mock-create-role">
      Mock Create Role Form
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

describe("ManageRoles Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------------
  // 1️⃣ LOADING STATE
  // ------------------------------
  test("shows loading text initially", async () => {
    mockFetch([]); // for initial call

    render(<ManageRoles />);

    expect(screen.getByText("Loading roles...")).toBeInTheDocument();

    // Wait for fetchRoles to resolve
    await act(async () => {});
  });

  // ------------------------------
  // 2️⃣ SUCCESSFUL FETCH OF ROLES
  // ------------------------------
  test("displays roles in table after fetch", async () => {
    const roles = [
      { id: 1, name: "Admin", description: "Full access" },
      { id: 2, name: "User", description: "Limited access" },
    ];

    mockFetch(roles);

    render(<ManageRoles />);

    await act(async () => {});

    expect(screen.getByTestId("mock-table")).toBeInTheDocument();

    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
  });

  // ------------------------------
  // 3️⃣ ERROR STATE
  // ------------------------------
  test("shows error message when fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("API Error"));

    render(<ManageRoles />);

    await act(async () => {});

    expect(screen.getByText("Failed to load roles")).toBeInTheDocument();
  });

  // ------------------------------
  // 4️⃣ OPEN DIALOG WHEN CLICK "CREATE ROLE"
  // ------------------------------
  test("opens Create Role dialog when clicking button", async () => {
    mockFetch([]);

    render(<ManageRoles />);

    await act(async () => {});

    const button = screen.getByRole("button", { name: /create role/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("mock-create-role")).toBeInTheDocument();
  });

  // ------------------------------
  // 5️⃣ REFRESH ROLES AFTER SUCCESSFUL ROLE CREATION
  // ------------------------------
  test("calls fetchRoles again when CreateRoleForm triggers onSuccess", async () => {
    const initialRoles = [];
    const updatedRoles = [
      { id: 1, name: "New Role", description: "Created" },
    ];

    mockFetch(initialRoles); // first load
    mockFetch(updatedRoles); // when refreshed

    render(<ManageRoles />);

    await act(async () => {});

    const createBtn = screen.getByRole("button", { name: /create role/i });
    const user = userEvent.setup();
    await user.click(createBtn);

    const confirmBtn = screen.getByTestId("mock-create-role");
    await user.click(confirmBtn);

    await act(async () => {});

    expect(screen.getByText("New Role")).toBeInTheDocument();
  });
});
