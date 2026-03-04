import { Module } from '@nestjs/common';
import { TaskTypesService } from './task-types.service';
import { TaskTypesController } from './task-types.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TaskTypesController],
  providers: [
    PrismaService,
    TaskTypesService
  ],
})
export class TaskTypesModule {}
