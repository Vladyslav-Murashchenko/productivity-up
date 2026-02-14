import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createTask } from "@/libs/api/tasks/createTask";

import { CreateTask } from "./CreateTask";

vi.mock("@/libs/api/tasks/createTask");

const onCreateSuccess = vi.fn();
const renderCreateTask = (props = {}) =>
  render(<CreateTask onCreateSuccess={onCreateSuccess} {...props} />);

describe("CreateTask", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(createTask).mockResolvedValue();
  });

  it("renders task creation form", () => {
    renderCreateTask();

    expect(screen.getByText("What would you like to focus on?")).toBeDefined();
    expect(screen.getByPlaceholderText("Enter a task...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("updates input value when user types", async () => {
    const user = userEvent.setup();
    renderCreateTask();

    const input = screen.getByPlaceholderText("Enter a task...");

    await user.type(input, "Write tests");

    expect(input).toHaveValue("Write tests");
  });

  it("creates task and clears input when form is submitted with valid input", async () => {
    const user = userEvent.setup();

    renderCreateTask();

    const input = screen.getByPlaceholderText("Enter a task...");
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(input, "Write tests");
    await user.click(submitButton);

    expect(createTask).toHaveBeenCalledWith("Write tests");

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });

  it("trims whitespace from task name before creating", async () => {
    const user = userEvent.setup();

    renderCreateTask();

    const input = screen.getByPlaceholderText("Enter a task...");
    await user.type(input, "  Write tests  ");
    await user.click(screen.getByRole("button", { name: /create/i }));

    expect(createTask).toHaveBeenCalledWith("Write tests");
  });

  it("calls onCreateSuccess callback after successful task creation", async () => {
    const user = userEvent.setup();

    renderCreateTask();

    const input = screen.getByPlaceholderText("Enter a task...");
    await user.type(input, "Write tests");
    await user.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(onCreateSuccess).toHaveBeenCalledOnce();
    });
  });

  it("does not create task when input is empty", async () => {
    const user = userEvent.setup();

    renderCreateTask();

    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    expect(createTask).not.toHaveBeenCalled();
  });

  it("does not create task when input contains only whitespace", async () => {
    const user = userEvent.setup();

    renderCreateTask();

    const input = screen.getByPlaceholderText("Enter a task...");
    await user.type(input, "  ");
    await user.click(screen.getByRole("button", { name: /create/i }));

    expect(createTask).not.toHaveBeenCalled();
  });
});
