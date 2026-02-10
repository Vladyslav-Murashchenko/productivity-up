import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EditTaskNameModal } from "./EditTaskNameModal";

vi.mock("@/libs/api/tasks/updateTaskName");

const TASK_ID = 1;
const onOpenChange = vi.fn();

const renderEditTaskNameModal = (props = {}) =>
  render(
    <EditTaskNameModal
      taskId={TASK_ID}
      currentName="Write tests"
      isOpen={true}
      onOpenChange={onOpenChange}
      {...props}
    />,
  );

describe("EditTaskNameModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal with heading when open", () => {
    renderEditTaskNameModal();

    expect(screen.getByText("Edit Task Name")).toBeInTheDocument();
  });

  it("renders form with current task name", () => {
    renderEditTaskNameModal();

    const input = screen.getByLabelText("Task Name");
    expect(input).toHaveValue("Write tests");
  });

  it("does not render when isOpen is false", () => {
    renderEditTaskNameModal({ isOpen: false });

    expect(screen.queryByText("Edit Task Name")).not.toBeInTheDocument();
  });

  it("should submit new name when form is submitted", async () => {
    const user = userEvent.setup();
    const { updateTaskName } = vi.mocked(
      await import("@/libs/api/tasks/updateTaskName"),
    );

    renderEditTaskNameModal();

    const input = screen.getByLabelText("Task Name");
    const submitButton = screen.getByRole("button", { name: /save/i });

    await user.clear(input);
    await user.type(input, "New Task Name");
    await user.click(submitButton);

    expect(updateTaskName).toHaveBeenCalledWith(TASK_ID, "New Task Name");
  });

  it("should show error when submitting empty name", async () => {
    const user = userEvent.setup();

    renderEditTaskNameModal();

    const input = screen.getByLabelText("Task Name");
    const submitButton = screen.getByRole("button", { name: /save/i });

    await user.clear(input);
    await user.click(submitButton);
    expect(screen.getByText("Task name cannot be empty")).toBeInTheDocument();
  });

  it("calls onOpenChange with false when form is submitted successfully", async () => {
    const user = userEvent.setup();

    renderEditTaskNameModal();

    const submitButton = screen.getByRole("button", { name: /save/i });
    await user.click(submitButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
