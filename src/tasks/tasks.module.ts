import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { TaskTypesService } from 'src/task-types/task-types.service';

@Module({
  controllers: [TasksController],
  providers: [
    PrismaService,
    
    UsersService,
    TaskTypesService,
    TasksService
  ],
})
export class TasksModule {}
