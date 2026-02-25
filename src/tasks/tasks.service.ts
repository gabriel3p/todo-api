import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

  private taskList: Task[] = [];

  create(createTaskDto: CreateTaskDto) {
    const newTask: Task = {
        title: createTaskDto.title,
        createdAt: new Date(),
        id: crypto.randomUUID(),
        description: createTaskDto.description,
        completed: createTaskDto.completed || false,
    }

    this.taskList.push(newTask);
  }

  findAll() {
    return this.taskList;
  }

  findOne(id: string) {
    const task= this.taskList.find(task => task.id == id);

    if (!task)
      throw new NotFoundException;

    return task
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    this.findOne(id);

    const taskIndex = this.taskList.findIndex(task => task.id == id);
    this.taskList[taskIndex] = { ...this.taskList[taskIndex], ...updateTaskDto }
  }

  remove(id: string) {
    this.findOne(id);
    
    const taskIndex = this.taskList.findIndex(task => task.id == id);
    this.taskList.splice(taskIndex, 1);
  }
}
