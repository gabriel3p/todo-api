import { Task } from "src/tasks/entities/task.entity";

export class TaskType {
    id: number;
    name: string;
    description: string;
    tasks: Task[];
}
