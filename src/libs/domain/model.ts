export type Task = {
  id: number;
  name: string;
  status: "todo" | "done";
};

export type ActiveTaskState = {
  taskId: Task["id"];
  startTime: Date;
};

export type Interval = {
  start: Date;
  end: Date;
};

export type TimeInterval = Interval & {
  id: number;
  taskId: Task["id"];
};
