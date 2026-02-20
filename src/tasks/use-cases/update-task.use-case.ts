import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ITaskRepository } from '../task.repository';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  execute(input: UpdateTaskDto, id: string) {
    const task = this.taskRepository.findById(id);

    if (!task)
        throw new NotFoundException("Task not found!");

    input.description = input.description ? input.description : task.description;
    input.title = input.title ? input.title : task.title;

    this.taskRepository.update(input, id);

    return;
  }
}