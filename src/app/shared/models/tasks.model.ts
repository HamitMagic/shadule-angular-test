export interface ITask {
  deadline: Date;
  deadlineTime: Date;
  created: Date;
  id?: number | undefined;
  description: string;
  tags: string[];
  name: string;
  status: 'deleted' | 'important' | 'done' | undefined;
}