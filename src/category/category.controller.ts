import { Controller, Get, Param, Render, Post, Body, Res } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller("top/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Get()
    @Render("category.njk")
    async readCategories() {
      const categories = await this.categoryService.readCategories();
      return { posts: categories };
  }


  @Get("/add")
    @Render("category-form.njk")
    async renderCategoryForm() {
      return {};
    }

    @Post()
    async createCategory(
      @Body("name") name: string,
      @Res() res: any,){
        await this.categoryService.createCategory(name);
        return res.redirect("/top/categories");
      }
    }