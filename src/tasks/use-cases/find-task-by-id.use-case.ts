import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ITaskRepository } from '../task.repository';

@Injectable()
export class FindTaskByIdUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository, //Repository em memoria
  ) {}

  execute(id: string) {
    const task = this.taskRepository.findById(id);

    if (!task)
        throw new NotFoundException("Task not found!");

    return task;
  }
}