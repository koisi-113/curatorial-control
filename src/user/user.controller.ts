import { Controller, Get, Param, Render, Post, Body, Res, Put, Delete } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("top/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  //ユーザー一覧の表示
  @Get()
  @Render("users.njk")
  async showUsers(){
    return;
  }

  //ユーザー追加画面の表示
  @Get("add")
  @Render("user_form.njk")
  async renderUserForm() {
    return {};
  }

  //ユーザーの追加
  @Post()
  async createUser(
    @Body("name") name: string,
    @Body("grade") grade: string,
    @Res() res: any,){
      await this.userService.createUser(name, grade);
      return res.redirect("top/users");
  }

  @Get(":id")
  @Render("update_book.njk")
  async showUpdateUserForm(){
    return;
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body("grade") grade: string,
    @Body("name") name: string,
    @Res() res: any
  ){
      await this.userService.updateUser(
        parseInt(id),
        grade,
        name,
      );
      return res.redirect("top/users");
  }
  
  @Delete(":id")
  async deleteUser(@Param("id") id: string, @Res() res: any){
    await this.userService.deleteUser(parseInt(id));
    return res.redirect("top/users");
  }

}