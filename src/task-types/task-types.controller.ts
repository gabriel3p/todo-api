import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { TaskTypesService } from './task-types.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Controller('task-types')
export class TaskTypesController {
  constructor(private readonly taskTypesService: TaskTypesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskTypeDto: CreateTaskTypeDto) {
    return this.taskTypesService.create(createTaskTypeDto);
  }

  @Get()
  findAll() {
    return this.taskTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskTypesService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTaskTypeDto: UpdateTaskTypeDto) {
    return this.taskTypesService.update(+id, updateTaskTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskTypesService.remove(+id);
  }
}
