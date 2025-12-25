import repository from '../repository.js';

// Service Layer - Category Business Logic
class CategoryService {
  async getAllCategories() {
    return await repository.getAll('categories');
  }

  async getCategoryById(id) {
    const category = await repository.getById('categories', id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async createCategory(data) {
    const { name, description } = data;
    if (!name) {
      throw new Error('Category name is required');
    }
    return await repository.create('categories', { name, description });
  }

  async updateCategory(id, data) {
    const category = await repository.update('categories', id, data);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async deleteCategory(id) {
    const deleted = await repository.delete('categories', id);
    if (!deleted) {
      throw new Error('Category not found');
    }
    return { message: 'Category deleted successfully' };
  }
}

export default new CategoryService();
