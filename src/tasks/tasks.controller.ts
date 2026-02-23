import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { UpdateTaskUseCase } from './use-cases/update-task.use-case';
import { DeleteTaskUseCase } from './use-cases/delete-task.use-case';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { FindAllTasksUseCase } from './use-cases/find-all-tasks.use-case';
import { FindTaskByIdUseCase } from './use-cases/find-task-by-id.use-case';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

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
  @ApiOperation({
    summary: "Cadastra uma Nova Tarefa",
    description: "Cadastra uma nova tarefa."
  })
  @ApiCreatedResponse({
    description: "Tarefa cadastrada com sucesso!"
  })
  @ApiBadRequestResponse({
    description: "Tarefa não pode ser cadastrada. Valide os campos e tente novamente."
  })
  @ApiBody({ type: CreateTaskDto })
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.createTaskUseCase.execute(createTaskDto);
  }




  @Get()
  @ApiOperation({
    summary: "Lista todas as Tarefas",
    description: "Lista todas as tarefas cadastradas."
  })
  @ApiResponse({
    status: 200,
    description: "Tarefas listadas com sucesso!",
    type: [Task]
  })
  @ApiBadRequestResponse({
    description: "Erro ao Listar as tarefas. Tente novamente."
  })
  findAll() {
    return this.findAllTasksUseCase.execute();
  }




  @Get(':id')
  @ApiOperation({
    summary: "Busca Tarefa pelo ID",
    description: "Busca uma tarefa pelo seu ID."
  })
  @ApiBadRequestResponse({
    description: "Erro ao buscar a tarefa. Tente novamente."
  })
  @ApiNotFoundResponse({
    description: "Tarefa não encontrada!"
  })
  @ApiResponse({
    status: 200,
    description: "Tarefa encontrada com sucesso!",
    type: Task
  })
  @ApiParam({
    name: "id",
    description: "Id da tarefa específica.",
    example: "bd04b830-cd2f-470c-82da-23a75096c602"
  })
  findOne(@Param('id') id: string) {
    return this.findTaskByUseCase.execute(id);
  }



  @Patch(':id')
  @ApiOperation({
    summary: "Atualiza uma Tarefa",
    description: "Atualiza uma tarefa pelo seu ID."
  })
  @ApiResponse({
    status: 200,
    description: "Tarefa atualizada com sucesso!"
  })
  @ApiBadRequestResponse({
    description: "Erro ao atualizar a tarefa. Tente novamente."
  })
  @ApiNotFoundResponse({
    description: "Tarefa não encontrada!"
  })
  @ApiParam({
    name: "id",
    description: "Id da tarefa específica.",
    example: "bd04b830-cd2f-470c-82da-23a75096c602"
  })
  @ApiBody({ type: UpdateTaskDto })
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.updateTaskUseCase.execute(updateTaskDto, id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Deleta uma Tarefa",
    description: "Deleta uma tarefa pelo seu ID."
  })
  @ApiResponse({
    status: 200,
    description: "Tarefa Deletada com sucesso!"
  })
  @ApiBadRequestResponse({
    description: "Erro ao Deletar a tarefa. Tente novamente."
  })
  @ApiNotFoundResponse({
    description: "Tarefa não encontrada!"
  })
  @ApiParam({
    name: "id",
    description: "Id da tarefa específica.",
    example: "bd04b830-cd2f-470c-82da-23a75096c602"
  })
  remove(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }
}
