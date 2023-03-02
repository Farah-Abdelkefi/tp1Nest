import { TodoStatusEnum } from '../enums/todo-status.enum';
import { IsOptional,IsEnum,IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class updateTodoDto {  
    @MinLength(3,{
        message:"Vous devez inserer min 3 caracteres "
    })
    @MaxLength(10,{
        message:"Vous devez inserer max 10 caracteres "
    })
    @IsOptional()
    name: string;
    @IsOptional()
    @MinLength(10,{
        message:"Vous devez inserer min 10 caracteres "
    })  
    description: string;
    @IsOptional()
    @IsEnum(TodoStatusEnum)
    status: TodoStatusEnum ;
}
  