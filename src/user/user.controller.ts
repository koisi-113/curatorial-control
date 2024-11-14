import {
  Controller,
  Get,
  Param,
  Render,
  Post,
  Body,
  Res,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('top/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //アカウント一覧の表示
  @Get()
  @Render('users.njk')
  async showUsers() {
    const users = await this.userService.readUsers();
    return { posts: users };
  }

  //アカウント追加画面の表示
  @Get('add')
  @Render('user_form.njk')
  async renderUserForm() {
    const user_form = await this.userService.addUsers();
    return { posts: user_form };
  }

  //ユーザーの追加
  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('grade') grade: string,
    @Res() res: any,
  ) {
    await this.userService.createUser(name, grade);
    return res.redirect('/top/users');
  }

  @Get(':id')
  @Render('update_user.njk')
  async showUpdateUserForm(id: string) {
    //const user = await this.userService.findUser(id);
    //return { user: user };
    return;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('grade') grade: string,
    @Body('name') name: string,
    @Res() res: any,
  ) {
    await this.userService.updateUser(parseInt(id), grade, name);
    return res.redirect('/top/users');
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: any) {
    await this.userService.deleteUser(parseInt(id));
    return res.redirect('/top/users');
  }
}
