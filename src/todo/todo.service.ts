import {  NotFoundException , Inject , Injectable } from '@nestjs/common';
import { Todo } from './Model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';

import { v4 as uuidv4 } from  'uuid';

@Injectable()
export class TodoService {
    todos: Todo[] = [new Todo('1', 'Monday', 'Buy Milk')];

    @Inject('UUID') uuid: ()=> number ;
  
    getTodos(): Todo[] {
      return this.todos;
    }

    addTodo( newTodoData: AddTodoDto ): Todo {
        let todo = new Todo();
        // const { name, description} = newTodoData;
        todo.id = uuidv4();
        todo = { ...todo, ...newTodoData };
        this.todos.push(todo);
        return todo;
    }

    getTodoById( id: string):Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if(todo)
            return todo;
        throw new NotFoundException(`le todo d'id ${id} n'existe pas` )
    }

    deleteTodo( id: string) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo){
            this.todos = this.todos.filter(todo => todo.id !== id);
            return { message: 'Todo deleted' };
        }
        else {
            throw new NotFoundException(`le todo d'id ${id} n'existe pas` )
        }
    }

    updateTodo( id: string, updateTodo:updateTodoDto ):Todo {

        this.todos=this.todos.map(todo => (todo.id === id ? {updateTodo,...todo} : todo ));
        
        return this.getTodoById(id);
      
    }



}
