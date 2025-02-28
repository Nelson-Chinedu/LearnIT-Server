import { DeleteResult } from 'typeorm';
import { Category } from '../../db';

import { AppDataSource } from '../../index';

class CategoryServices {
  async addCategory(payload: any) {
    const { name, id } = payload;
    try {
      const newCategory: Category = AppDataSource.manager.create(Category, {
        name,
        profile: id,
      });
      await AppDataSource.manager.save(newCategory);
      return newCategory;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(payload: any) {
    const { categoryId } = payload;

    try {
      const category: DeleteResult = await AppDataSource.manager
        .getRepository(Category)
        .createQueryBuilder('category')
        .delete()
        .where('id = :categoryId', { categoryId })
        .execute();
      return category;
    } catch (error) {
      throw error;
    }
  }

  async getCategories(id: Express.User | undefined) {
    try {
      const categories: Category[] = await AppDataSource.manager
        .getRepository(Category)
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.resource', 'resource')
        .where('category.profile = :id', { id })
        .getMany();

      return categories;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryServices();
