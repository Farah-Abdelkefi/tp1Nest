import { TodoStatusEnum } from '../enums/todo-status.enum';

export class updateTodoDto {  
    name: string;
    description: string;
    status: TodoStatusEnum ;
}
  