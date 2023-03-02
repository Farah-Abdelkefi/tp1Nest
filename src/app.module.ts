import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/Entity/todo.entity';


@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mydb',
      entities: [TodoEntity ],
      synchronize: true,
    }),
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
