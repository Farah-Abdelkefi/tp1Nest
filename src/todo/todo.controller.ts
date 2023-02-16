import { Body, Controller, Get, Post,Put, Req, Delete,Param, NotFoundException } from "@nestjs/common";
import { Todo } from './Model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';
import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController {

    
  constructor(private todoService: TodoService){}
  @Get()
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }

  @Post()
  addTodo( @Body() newTodoData: AddTodoDto ): Todo {
    return this.todoService.addTodo(newTodoData);
  }

  @Get(':id')
  getTodoById(@Param('id') id: string) : Todo {
      return this.todoService.getTodoById(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string)  {
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, updateTodo:updateTodoDto ):Todo {
    return this.todoService.updateTodo(id,updateTodo);    
  }
}
