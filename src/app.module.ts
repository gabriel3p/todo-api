import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TaskTypesModule } from './task-types/task-types.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    UsersModule,
    TaskTypesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
