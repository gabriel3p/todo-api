import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { TaskTypesService } from 'src/task-types/task-types.service';
import { Task } from 'generated/prisma/client';

@Injectable()
export class TasksService {


  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
    private taskTypesService: TaskTypesService
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userService.findOne(createTaskDto.ownerId);
    const taskType = await this.taskTypesService.findOne(createTaskDto.taskTypeId);

    const task: Task = await this.prismaService.task.create({
      data: {
        ...createTaskDto,
        ownerId: user.id,
        taskTypeId: taskType.id
      },
      include: {
        owner: true,
        taskType: true
      }
    });

    return task;
  }

  async findAll(): Promise<Task[]> {
    return await this.prismaService.task.findMany({
      include: {
        owner: true,
        taskType: true
      }
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: {
        owner: true,
        taskType: true
      }
    });

    if (!task)
      throw new NotFoundException(`Task with id ${id} not found`);

    return task;
  }


  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id);

    await this.prismaService.task.update({
      where: { id },
      data: {
        ...updateTaskDto,
        updatedAt: new Date()
      }
    });

    return await this.findOne(id);

  }

  async remove(id: number) {
    await this.findOne(id);
    
    await this.prismaService.task.delete({
      where: { id }
    });
  }
}
