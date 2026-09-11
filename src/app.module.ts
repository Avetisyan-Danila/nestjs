import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseModule } from './database/database.module.js';
import { EmployeesModule } from './employees/employees.module.js';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
