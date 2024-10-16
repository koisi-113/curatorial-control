import { Controller, Get, Param, Render, Post, Body, Res } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("books/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Render("user-form.njk")
  async renderUserForm() {
    return {};
  }

  @Post()
  async createUser(
    @Body("name") name: string,
    @Body("grade") grade: string,
    @Res() res: any,){
      await this.userService.createUser(name, grade);
      return res.redirect("/books/users");
    }
  }