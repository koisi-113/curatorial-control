import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "./models/book.model";
import { User } from "./models/user.model";
import { Category } from "./models/category.model";


@Injectable()
export class AppService {
 constructor(
  @InjectModel(Book)
  private bookModel: typeof Book,

  @InjectModel(Category)
  private categoryModel: typeof Category,

  @InjectModel(User)
  private userModel: typeof User,
 ){}

  async readBooks(): Promise<Book[]> {
    return this.bookModel.findAll({ include: [User,Category] });
  }

  async readBookById(id: number): Promise<Book | null> {
    return await this.bookModel.findByPk(id);
  }

  async createBook(name: string,categoryId: number,author: string,isbn: string,publisher: string,is_borrowing: boolean,userId: number): Promise<void> {
    await this.bookModel.create({ name, categoryId, author, isbn, publisher, is_borrowing, userId });
  }

  async deleteBook(id: number): Promise<void> {
    await this.bookModel.destroy({ where: { id } });
  }

  async updateBook(id: number, name: string,categoryId: number,author: string,isbn: string,publisher: string,is_borrowing: boolean,userId: number): Promise<void> {
    await this.bookModel.update(
      { name, categoryId, author, isbn, publisher, is_borrowing, userId },
      { where: { id } }
    );
  }

  async readCategories() {
    return await this.categoryModel.findAll();
  }

  async createCategory(name: string): Promise<void> {
    await this.categoryModel.create({ name });
  }

  async readUsers() {
    return await this.userModel.findAll();
  }

  async createUser(name: string,grade: string): Promise<void> {
    await this.userModel.create({ name,grade });
  }

  
}