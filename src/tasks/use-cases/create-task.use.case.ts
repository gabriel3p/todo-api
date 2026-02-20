import { Inject, Injectable } from '@nestjs/common';
import type { ITaskRepository } from '../task.repository';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository, 
  ) {}

  async execute(input: CreateTaskDto) {
    this.taskRepository.create(input);

    return input;
  }
}