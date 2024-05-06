export interface ITask {
	deadline: Date,
	created: Date,
	id: number,
	description: string,
	tags: string[];
	name: string,
	status: 'deleted' | 'important' | 'done' | undefined,
}