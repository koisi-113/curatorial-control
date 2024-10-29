import {
  Controller,
  Get,
  Param,
  Render,
  Post,
  Body,
  Res,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { parse } from 'path';

@Controller('top/books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  //本の一覧表示
  @Get('/')
  @Render('books.njk')
  async renderIndex() {
    const books = await this.bookService.readBooks();
    //const users = await this.userService.readUsers();
    //const categories = await this.categoryService.readCategories();
    return { posts: books };
  }

  //本の追加
  @Post()
  async createBook(
    @Body('name') name: string,
    @Body('categoryId') categoryId: number,
    @Body('author') author: string,
    @Body('isbn') isbn: string,
    @Body('publisher') publisher: string,
    @Body('is_borrowing') is_borrowing: boolean,
    @Body('userId') userId: number,
    @Res() res: any,
  ) {
    await this.bookService.createBook(
      name,
      categoryId,
      author,
      isbn,
      publisher,
      is_borrowing,
      userId,
    );
    return res.redirect('/books');
  }

  //検索結果ページを表示
  @Get('search')
  @Render("search_result.njk")
  async getSearchBook(@Query('name') name: string){
    //ヒットした本を取得
  }

  //本の追加ページを表示
  @Get('add')
  @Render("add_book.njk")
  showAddPage(){
    return;
  }

  //本の詳細情報ページ
  @Get(':id')
  @Render("detail_book.njk")
  async showDetail(@Param('id') id: string, @Res() res: any) {
    const book = await this.bookService.readBookById(parseInt(id));
    return;
  }

  //本の削除
  @Delete(':id')
  async deleteBookById(@Param('id') id: string, @Res() res: any) {
    await this.bookService.deleteBookById(parseInt(id));
    return res.redirect('/books');
  }

  //本の更新ページ
  @Get(':id/edit')
  @Render('update_book.njk')
  async renderUpdateBookForm(@Param('id') id: string) {
    const book = await this.bookService.readBookById(parseInt(id));
    const users = await this.userService.readUsers();
    const categories = await this.categoryService.readCategories();
    return { book, users, categories };
  }

  //本の更新
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('categoryId') categoryId: number,
    @Body('author') author: string,
    @Body('isbn') isbn: string,
    @Body('publisher') publisher: string,
    @Body('is_borrowing') is_borrowing: boolean,
    @Body('userId') userId: number,
    @Res() res: any,
  ) {
    await this.bookService.updateBook(
      parseInt(id),
      name,
      categoryId,
      author,
      isbn,
      publisher,
      is_borrowing,
      userId,
    );
    return res.redirect('/books');
  }
}
