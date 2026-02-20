import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './task.repository';
import { FindAllTasksUseCase } from './use-cases/find-all-tasks.use-case';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { FindTaskByIdUseCase } from './use-cases/find-task-by-id.use-case';
import { DeleteTaskUseCase } from './use-cases/delete-task.use-case';
import { UpdateTaskUseCase } from './use-cases/update-task.use-case';

@Module({
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
    DeleteTaskUseCase,
    UpdateTaskUseCase,
    
    TaskRepository,
    {
      provide: 'ITaskRepository',
      useExisting: TaskRepository,
    },
  ],
})
export class TasksModule {}
