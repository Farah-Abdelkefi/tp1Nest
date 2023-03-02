import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { notEmptyMess ,minLengthMess,maxLengthMess  } from 'src/todo/dto/messages' ; 
export class AddTodoDto {
  @IsNotEmpty({
    message: notEmptyMess("nom") //message:"Vous devez spécifier un nom "
  })
  @MinLength(3,{
    message: minLengthMess(3) //message:"Vous devez inserer min 3 caracteres "
  })
  @MaxLength(10,{
    message: maxLengthMess(10) //    message:"Vous devez inserer max 10 caracteres "
  })
  name: string;
  @IsNotEmpty({
    message: notEmptyMess("description") //"Vous devez spécifier une description "
  })
  @MinLength(10,{
    message:minLengthMess(10) //"Vous devez inserer min 10 caracteres "
  })  
  description: string;
}
