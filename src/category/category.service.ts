import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async readCategories() {
    return await this.categoryModel.findAll();
  }

  async createCategory(name: string): Promise<void> {
    await this.categoryModel.create({ name });
  }
}
