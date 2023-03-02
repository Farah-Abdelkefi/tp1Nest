import { IsEnum } from 'class-validator';
import { TodoStatusEnum } from '../enums/todo-status.enum';

export class CountTodosDto {
  @IsEnum(TodoStatusEnum)
  state: TodoStatusEnum;
}
