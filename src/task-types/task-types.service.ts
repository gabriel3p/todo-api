import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskType } from 'generated/prisma/browser';

@Injectable()
export class TaskTypesService {

  constructor(private prismaService: PrismaService) {}

  async create(createTaskTypeDto: CreateTaskTypeDto): Promise<TaskType> {
    return await this.prismaService.taskType.create({
      data: createTaskTypeDto
    });
  }

  async findAll(): Promise<TaskType>  {
    return await this.prismaService.taskType.findMany();
  }

  async findOne(id: number): Promise<TaskType> {
    const taskType: TaskType = await this.prismaService.taskType.findUnique({
      where: { id }
    });

    if (!taskType)
      throw new NotFoundException(`TaskType with id ${id} not found`);

    return taskType;
  }

  async update(id: number, updateTaskTypeDto: UpdateTaskTypeDto): Promise<TaskType> {
    const taskType: TaskType = await this.prismaService.taskType.findUnique({
      where: { id }
    });

    if (!taskType)
      throw new NotFoundException(`TaskType with id ${id} not found`);

    await this.prismaService.taskType.update({
      where: { id },
      data: updateTaskTypeDto
    });

    return this.prismaService.taskType.findUnique({ where: { id } });

  }

  async remove(id: number): Promise<void> {
    const taskType: TaskType = await this.prismaService.taskType.findUnique({
      where: { id }
    });

    if (!taskType)
      throw new NotFoundException(`TaskType with id ${id} not found`);

    await this.prismaService.taskType.delete({
      where: { id }
    });
  }
}
