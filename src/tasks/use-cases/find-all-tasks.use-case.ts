import { Inject, Injectable } from '@nestjs/common';
import type { ITaskRepository } from '../task.repository';

@Injectable()
export class FindAllTasksUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository, //Repository em memoria
  ) {}

  execute() {
    return this.taskRepository.findAll();
  }
}