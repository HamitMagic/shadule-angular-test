export interface ITask {
  deadline: Date;
  deadlineTime: Date;
  created: Date;
  description: string;
  tags: ITag[];
  name: string;
  isDeleted: boolean;
  isDone: boolean;
  isImportant: boolean;
}
export interface ITaskID extends ITask {
  id: number
}
export type TStatusKeys = 'isDeleted' | 'isDone';
export interface ITag {
  class: 'productivity' | 'education' | 'health' | 'urgent';
  text: 'Продуктивность' | 'Образование' | 'Здоровье' | 'Срочно';
  isActive?: boolean;
}
export const TAG: ITag[] = [
  { class: 'productivity', text: 'Продуктивность' },
  { class: 'education', text: 'Образование' },
  { class: 'health', text: 'Здоровье' },
  { class: 'urgent', text: 'Срочно' },
];