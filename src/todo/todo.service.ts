import {  NotFoundException , Inject , Injectable } from '@nestjs/common';
import { Todo } from './Model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';
import { SearchTodoDto } from './dto/Search-todo.dto'
import { v4 as uuidv4 } from  'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './Entity/todo.entity';
import { Repository,Like } from 'typeorm';
import { TodoStatusEnum } from './enums/todo-status.enum';

@Injectable()
export class TodoService {
    todos: Todo[] = [new Todo('1', 'Monday', 'Buy Milk')];

    constructor(
        @InjectRepository(TodoEntity)
        private todoRepo: Repository<TodoEntity>,
    ){}
    @Inject('UUID') uuid: ()=> number ;
  
    getTodos(): Promise<TodoEntity[]> {
      
      return this.todoRepo.find();//return this.todos;
    }


    addTodo( newTodoData: AddTodoDto ): Todo {
        let todo = new Todo();
        todo.id = uuidv4();
        todo = { ...todo, ...newTodoData };
        this.todos.push(todo);
        return todo;
    }
   
    getTodoById( id: string): Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if(todo)
            return todo;
        throw new NotFoundException(`le todo d'id ${id} n'existe pas` );     
    }
    async findTodoById( id: string): Promise<TodoEntity> {
        const todo = await this.todoRepo.findOneBy({id});
        if(todo)
            return todo;
        throw new NotFoundException(`le todo d'id ${id} n'existe pas` );
    }

    deleteTodo( id: string) {
         const todo = this.todos.find(todo => todo.id === id);
        if (todo){
            this.todos = this.todos.filter(todo => todo.id !== id);
            return { message: 'Todo deleted' };
        }
        else {
            throw new NotFoundException(`le todo d'id ${id} n'existe pas` )
        }}
        
    

    updateTodo( id: string, updateTodo:updateTodoDto ):Todo {

        this.todos=this.todos.map(todo => (todo.id === id ? {updateTodo,...todo} : todo ));
        
        return this.getTodoById(id);
      
    }

     addTodoDB(newTodo: AddTodoDto): Promise<TodoEntity>{
        return this.todoRepo.save(newTodo);
    }

    async updateTodoByIdDb(id: string,updatedTodo: updateTodoDto): Promise<TodoEntity> {
        const  newTodo = await this.todoRepo.preload({id,...updatedTodo,});
        if (newTodo) {
          return this.todoRepo.save(newTodo);
        } else {
          throw new NotFoundException('Todo innexistant');
        }
    }

    async SoftdeleteTodo( id: string) {
        const res = await this.todoRepo.softDelete(id);
        if (res){
            return { message: 'Todo deleted' };
        }
        else {
            throw new NotFoundException(`le todo d'id ${id} n'existe pas` );
        }
    }
    
    async restoreTodo(id: string){
        const res = await this.todoRepo.restore(id);
        if (res){
            return { message: 'Todo restoree' };
        }
        else {
            throw new NotFoundException(`le todo d'id ${id} n'existe pas` );
        }
    }

    countType(state?: TodoStatusEnum) {
        return this.todoRepo.count({
          where: { status: state },
        });
    }

    findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
       /* const criterias = [];
        if (searchTodoDto.status) {
          criterias.push({ status: searchTodoDto.status });
        }
        if (searchTodoDto.criteria) {
          criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
          criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
        }
        if (criterias.length) {
          return this.todoRepo.find({ withDeleted: true, where: criterias });
        }
        return this.todoRepo.find({ withDeleted: true});*/
        searchTodoDto.limit = searchTodoDto.limit ?? 10 ;
        searchTodoDto.offset = searchTodoDto.offset ?? 10 ;

        const pagination = {
            take: searchTodoDto.limit,
            skip: searchTodoDto.limit * searchTodoDto.offset ,
        };
        if (!searchTodoDto || (!searchTodoDto.criteria && !searchTodoDto.status)){
            return this.todoRepo.find({ ...pagination});
        }
        const criterias = [];
        if (searchTodoDto.status) {
          criterias.push({ status: searchTodoDto.status });
        }
        if (searchTodoDto.criteria) {
          criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
          criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
        }    
        return this.todoRepo.find({ where: criterias , ...pagination });
     
    }
}
