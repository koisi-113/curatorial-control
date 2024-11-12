import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Category } from './category.model';

@Table({ tableName: 'book' })
export class Book extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @Column(DataType.STRING)
  name?: string;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId?: number;

  @BelongsTo(() => Category)
  category?: Category;

  @Column(DataType.STRING)
  author?: string;

  @Column(DataType.STRING)
  isbn?: string;

  @Column(DataType.STRING)
  publisher?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_borrowing: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId?: number;

  @BelongsTo(() => User)
  user?: User;
}
