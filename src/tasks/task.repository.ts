import { Injectable } from "@nestjs/common";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";


export interface ITaskRepository {
  create(task: CreateTaskDto): void;
  update(task: UpdateTaskDto, id: string): void;
  delete(tid: string): void;
  findAll(): Task[];
  findById(id: string): Task | undefined;
}

@Injectable()
export class TaskRepository implements ITaskRepository {
  private taskList: Task[] = [];

  create(task: CreateTaskDto): void {
    const newTask: Task = {
        title: task.title,
        createdAt: new Date(),
        id: crypto.randomUUID(),
        description: task.description,
        completed: task.completed || false,
    }

    this.taskList.push(newTask);
  }

  update(task: Task, id: string): void {
    const taskIndex = this.taskList.findIndex(task => task.id == id);
    this.taskList[taskIndex] = { ...this.taskList[taskIndex], ...task }
  }

  delete(id: string): void {
    const taskIndex = this.taskList.findIndex(task => task.id == id);
    this.taskList.splice(taskIndex, 1);
  }

  findAll(): Task[] {
    return this.taskList;
  }

  findById(id: string): Task | undefined {
    return this.taskList.find(task => task.id == id);
  }
}