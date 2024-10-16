import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "../models/book.model";
import { User } from "../models/user.model";
import { Category } from "../models/category.model";

@Injectable()
export class BookService {
 constructor(
  @InjectModel(Book)
  private bookModel: typeof Book,
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

  async deleteBookById(id: number): Promise<void> {
    await this.bookModel.destroy({ where: { id } });
  }

  async updateBook(id: number, name: string,categoryId: number,author: string,isbn: string,publisher: string,is_borrowing: boolean,userId: number): Promise<void> {
    await this.bookModel.update(
      { name, categoryId, author, isbn, publisher, is_borrowing, userId },
      { where: { id } }
    );
  }
}
