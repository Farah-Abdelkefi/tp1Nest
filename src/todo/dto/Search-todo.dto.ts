import { TodoStatusEnum } from '../enums/todo-status.enum';
import { IsEnum, IsOptional,IsInt } from 'class-validator';

export class Pagination {
  @IsOptional()
  @IsInt( )
  limit?: number;

  @IsOptional()
  @IsInt()
  offset?: number;
}

export class SearchTodoDto extends Pagination {
  @IsOptional()
  criteria?: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status?: TodoStatusEnum;
}
