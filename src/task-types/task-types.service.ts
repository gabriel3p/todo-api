import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskType } from 'generated/prisma/browser';

@Injectable()
export class TaskTypesService {

  constructor(private prismaService: PrismaService) {}

  async create(createTaskTypeDto: CreateTaskTypeDto): Promise<TaskType> {
    const existingTaskType: TaskType | null = await this.prismaService.taskType.findUnique({
      where: { name: createTaskTypeDto.name }
    });

    if (existingTaskType)
      throw new HttpException(`Task Type with name ${createTaskTypeDto.name} already exists`, HttpStatus.BAD_REQUEST);

    return await this.prismaService.taskType.create({
      data: createTaskTypeDto
    });
  }

  async findAll(): Promise<TaskType[]>  {
    return await this.prismaService.taskType.findMany();
  }

  async findOne(id: number): Promise<TaskType> {
    const taskType: TaskType | null = await this.prismaService.taskType.findUnique({
      where: { id }
    });

    if (!taskType)
      throw new NotFoundException(`TaskType with id ${id} not found`);

    return taskType;
  }

  async update(id: number, updateTaskTypeDto: UpdateTaskTypeDto): Promise<TaskType | null> {
    await this.findOne(id);

    const existingTaskType: TaskType | null = await this.prismaService.taskType.findUnique({
      where: { name: updateTaskTypeDto.name }
    });

    if (existingTaskType && existingTaskType.id !== id)
      throw new HttpException(`Task Type with name ${updateTaskTypeDto.name} already exists`, HttpStatus.BAD_REQUEST);

    await this.prismaService.taskType.update({
      where: { id },
      data: updateTaskTypeDto
    });

    return await this.findOne(id);

  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prismaService.taskType.delete({
      where: { id }
    });
  }
}
