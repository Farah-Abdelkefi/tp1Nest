import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TodoEntity} from './Entity/todo.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([TodoEntity]), CommonModule ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
