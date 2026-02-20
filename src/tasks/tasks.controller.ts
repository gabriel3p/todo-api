import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { UpdateTaskUseCase } from './use-cases/update-task.use-case';
import { DeleteTaskUseCase } from './use-cases/delete-task.use-case';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { FindAllTasksUseCase } from './use-cases/find-all-tasks.use-case';
import { FindTaskByIdUseCase } from './use-cases/find-task-by-id.use-case';

@Controller('tasks')
export class TasksController {

  @Inject(CreateTaskUseCase)
  private readonly createTaskUseCase: CreateTaskUseCase;

  @Inject(FindAllTasksUseCase)
  private readonly findAllTasksUseCase: FindAllTasksUseCase;

  @Inject(FindTaskByIdUseCase)
  private readonly findTaskByUseCase: FindTaskByIdUseCase;
  
  @Inject(DeleteTaskUseCase)
  private readonly deleteTaskUseCase: DeleteTaskUseCase;

  @Inject(UpdateTaskUseCase)
  private readonly updateTaskUseCase: UpdateTaskUseCase;




  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.createTaskUseCase.execute(createTaskDto);
  }

  @Get()
  findAll() {
    return this.findAllTasksUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findTaskByUseCase.execute(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.updateTaskUseCase.execute(updateTaskDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }
}
