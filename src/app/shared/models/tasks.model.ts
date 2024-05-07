export interface ITask {
  deadline: Date;
  deadlineTime: Date;
  created: Date;
  description: string;
  tags: string[];
  name: string;
  status: 'deleted' | 'done' | undefined;
  isUrgent: boolean;
}
export interface ITaskID extends ITask {
  id: number
}
