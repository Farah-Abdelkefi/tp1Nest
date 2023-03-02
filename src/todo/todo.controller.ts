import { Body, Controller, Query ,Patch ,Get, Post,Put, Delete,Param, NotFoundException } from "@nestjs/common";
import { Todo } from './Model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';
import { CountTodosDto } from './dto/count-todo.dto'
import { SearchTodoDto } from './dto/Search-todo.dto'
import { TodoService } from "./todo.service";
import { TodoEntity } from "./Entity/todo.entity";  
@Controller('todo')
export class TodoController {

    
  constructor(private todoService: TodoService){}
  @Get()
  getAllTodos(): Promise<TodoEntity[]> {
    return this.todoService.getTodos();
  }
  
  @Get()
  getTodos(@Query() searchTodoDto: SearchTodoDto):Promise<TodoEntity[]> {
    return this.todoService.findAll(searchTodoDto);
  }

  @Post()
  addTodo( @Body() newTodoData: AddTodoDto ): Promise<TodoEntity> {
    return this.todoService.addTodoDB(newTodoData);
  }

  @Get(':id')
  getTodoById(@Param('id') id: string) : Promise<TodoEntity> {
      return this.todoService.findTodoById(id);
  }

  @Patch()
  restoreTodo(@Param('id') id: string){
    return this.todoService.restoreTodo(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string)  {
    return this.todoService.SoftdeleteTodo(id);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, updateTodo:updateTodoDto ):Promise<TodoEntity> {
    return this.todoService.updateTodoByIdDb(id,updateTodo);    
  }

  @Get('count/:state')
  countTodos(@Param('state') countTodosDto: CountTodosDto) {
    return this.todoService.countType(countTodosDto.state);
  }

}
