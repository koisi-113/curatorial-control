import { Controller, Get, Param, Render, Post, Body, Res, Delete, Put } from "@nestjs/common";
import { BookService } from "./book.service";
import { CategoryService } from "../category/category.service";
import { UserService } from "../user/user.service";

@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService, private readonly categoryService: CategoryService, private readonly userService: UserService) {}

  @Get("/")
  @Render("index.njk")
  async renderIndex() {
    const todos = await this.bookService.readBooks();
    const users = await this.userService.readUsers();
    const categories = await this.categoryService.readCategories();
  return { posts: todos, users, categories };
  }

  @Post()
  async createBook(
    @Body("name") name: string,
    @Body("categoryId") categoryId: number,
    @Body("author") author: string,
    @Body("isbn") isbn: string,
    @Body("publisher") publisher: string,
    @Body("is_borrowing") is_borrowing: boolean,
    @Body("userId") userId: number,
    @Res() res: any,
    ){
      await this.bookService.createBook(name, categoryId, author, isbn, publisher, is_borrowing, userId);
      return res.redirect("/books");
    }


    @Delete(":id")
    async deleteBookById(
      @Param("id") id: string,
      @Res() res: any,) {
      await this.bookService.deleteBookById(parseInt(id));
      return res.redirect("/books");
    }

    @Get(":id/put")
    @Render("update.njk")
    async renderUpdateBookForm(@Param("id") id: string) {
      const book = await this.bookService.readBookById(parseInt(id));
      const users = await this.userService.readUsers();
      const categories = await this.categoryService.readCategories();
      return { book, users, categories };
    }

    @Put(":id")
    async updateBook(
      @Param("id") id: string,
      @Body("name") name: string,
      @Body("categoryId") categoryId: number,
      @Body("author") author: string,
      @Body("isbn") isbn: string,
      @Body("publisher") publisher: string,
      @Body("is_borrowing") is_borrowing: boolean,
      @Body("userId") userId: number,
      @Res() res: any,
    ) {
      await this.bookService.updateBook(parseInt(id),name, categoryId, author, isbn, publisher, is_borrowing, userId);
      return res.redirect("/books");
    }
  }