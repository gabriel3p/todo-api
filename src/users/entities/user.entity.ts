import { Task } from "src/tasks/entities/task.entity";

export class User {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    tasks?: Task[];
}
