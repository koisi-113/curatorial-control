import { Controller, Get, Param, Render, Post, Body, Res } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("books")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @Render("index.njk")
  async renderIndex() {
    const todos = await this.appService.readBooks();
    const users = await this.appService.readUsers();
    const categories = await this.appService.readCategories();
  return { posts: todos, users, categories };
  }

  @Post()
  async createTodo(
    @Body("name") name: string,
    @Body("categoryId") categoryId: number,
    @Body("author") author: string,
    @Body("isbn") isbn: string,
    @Body("publisher") publisher: string,
    @Body("is_borrowing") is_borrowing: boolean,
    @Body("userId") userId: number,
    @Res() res: any,
    ){
      await this.appService.createBook(name, categoryId, author, isbn, publisher, is_borrowing, userId);
      return res.redirect("/books");
    }


    @Post(":id/delete")
    async deleteTodo(
      @Param("id") id: string,
      @Res() res: any,) {
      await this.appService.deleteBook(parseInt(id));
      return res.redirect("/books");
    }

    @Get(":id/put")
    @Render("update.njk")
    async renderUpdateBookForm(@Param("id") id: string) {
      const book = await this.appService.readBookById(parseInt(id));
      const users = await this.appService.readUsers();
      const categories = await this.appService.readCategories();
      return { book, users, categories };
    }

    @Post(":id/put")
    async updateTodo(
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
      await this.appService.updateBook(parseInt(id),name, categoryId, author, isbn, publisher, is_borrowing, userId);
      return res.redirect("/books");
    }

    @Get("categories")
    @Render("category-form.njk")
    async renderCategoryForm() {
      return {};
    }

    @Post("categories")
    async createCategory(
      @Body("name") name: string,
      @Res() res: any,){
        await this.appService.createCategory(name);
        return res.redirect("/books/categories");
      }

      @Get("users")
    @Render("user-form.njk")
    async renderUserForm() {
      return {};
    }

    @Post("users")
    async createUser(
      @Body("name") name: string,
      @Body("grade") grade: string,
      @Res() res: any,){
        await this.appService.createUser(name, grade);
        return res.redirect("/books/users");
      }
    }