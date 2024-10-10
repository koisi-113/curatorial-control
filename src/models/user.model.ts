import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";
import { Book } from './book.model';

@Table({ tableName: "users" })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @Column(DataType.STRING)
  grade?: string;

  @Column(DataType.STRING)
  name?: string;

  @HasMany(() => Book)
  books?: Book[];
}