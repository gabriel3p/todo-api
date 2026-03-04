import { TaskType } from "src/task-types/entities/task-type.entity";
import { User } from "src/users/entities/user.entity";

export class Task {
    id: number;
    title: string;
    description: string;
    completed: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: number;
    owner: User;
    taskTypeId: number;
    taskType: TaskType;
}
