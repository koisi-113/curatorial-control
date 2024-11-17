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
  
  async readCategory(id: number) {
    return await this.categoryModel.findByPk(id);
  }

  async updateCategory(id: number, name: string): Promise<void> {
    await this.categoryModel.update({ name }, { where: { id } });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryModel.destroy({ where: { id } });
  }
}
