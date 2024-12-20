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
  @Post('/add')
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
    try{
      await this.bookService.createBook(
        name,
        categoryId,
        author,
        isbn,
        publisher,
        is_borrowing,
        userId,
      );
      return res.redirect('/top/books');
    }catch (error) {
      console.error('Error creating book:', error);
      res.status(500).send('Error creating book');
    }
    
  }

  //検索結果ページを表示
  @Get('search')
  @Render('search_result.njk')
  async getSearchBook(@Query('query') name: string) {
    //ヒットした本を取得
    const books = await this.bookService.readBookByName(name);
    return { books, name };
  }

  //本の追加ページを表示
  @Get('add')
  @Render('add_book.njk')
  async showAddPage() {
    const add_book = await this.bookService.addBooks();
    const categories = await this.categoryService.readCategories();
    return { posts: add_book, categories: categories };
  }

  //本の詳細情報ページ
  @Get(':id')
  @Render('detail_book.njk')
  async showDetail(@Param('id') id: string) {
    const book = await this.bookService.readBookById(parseInt(id));
    const users = await this.userService.readUsers();
    const bollowedId = String(book.userId); 
    const bollowedUser = await this.userService.readUser(bollowedId);
    //isbn値を取得
    const imgUrl = await this.bookService.getBookImageFromNDL(book.isbn);
    return { book, users, bollowedUser, imgUrl};
  }

  //本の削除
  @Delete(':id')
  async deleteBookById(@Param('id') id: string, @Res() res: any) {
    await this.bookService.deleteBookById(parseInt(id));
    return res.redirect('/top/books');
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
    console.log("更新しました。");
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
    
    return res.redirect('/top/books');
  }
}
