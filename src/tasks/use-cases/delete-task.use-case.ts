import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ITaskRepository } from '../task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  execute(id: string) {
    const task = this.taskRepository.findById(id);

    if (!task)
        throw new NotFoundException("Task not found!");

    this.taskRepository.delete(id);

    return;
  }
}