import { TodoStatusEnum } from '../enums/todo-status.enum';
import { CreateDateColumn,Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../Entity/timestamp.entity';

@Entity('todo')
export class TodoEntity extends TimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  name: string;
  @Column({})
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum = TodoStatusEnum.waiting;
 
}