export interface ITask {
  deadline: Date;
  deadlineTime: Date;
  created: Date;
  description: string;
  tags: TTag[];
  name: string;
  isDeleted: boolean;
  isDone: boolean;
  isImportant: boolean;
}
export interface ITaskID extends ITask {
  id: number
}
export type TStatusKeys = 'isDeleted' | 'isDone';
export interface TTag {
  class: string,
  text: string,
}