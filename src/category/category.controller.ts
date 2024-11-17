import {
  Controller,
  Get,
  Param,
  Render,
  Post,
  Body,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('top/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Render('category.njk')
  async readCategories() {
    const categories = await this.categoryService.readCategories();
    return { posts: categories };
  }

  @Get('/add')
  @Render('category-form.njk')
  async renderCategoryForm() {
    return {};
  }

  @Get(':id')
  @Render('update-category.njk')
  async showUpdateUserForm(@Param('id') id: string) {
    const category = await this.categoryService.readCategory(parseInt(id));
    return { category };
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body('name') name: string,
    @Res() res: any,
  ) {
    await this.categoryService.updateCategory(parseInt(id), name);
    return res.redirect('/top/categories');
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string, @Res() res: any) {
    await this.categoryService.deleteCategory(parseInt(id));
    return res.redirect('/top/categories');
  }

  @Post()
  async createCategory(@Body('name') name: string, @Res() res: any) {
    await this.categoryService.createCategory(name);
    return res.redirect('/top/categories');
  }
}
