import repository from '../repository.js';

// Service Layer - Product Business Logic
class ProductService {
  async getAllProducts() {
    const products = await repository.getAll('products');
    const categories = await repository.getAll('categories');
    
    // Join products with categories
    return products.map(product => {
      const category = categories.find(c => c.id === product.categoryId);
      return {
        ...product,
        category: category ? category.name : 'Unknown'
      };
    });
  }

  async getProductById(id) {
    const product = await repository.getById('products', id);
    if (!product) {
      throw new Error('Product not found');
    }
    const category = await repository.getById('categories', product.categoryId);
    return {
      ...product,
      category: category ? category.name : 'Unknown'
    };
  }

  async searchProducts(query) {
    const products = await this.getAllProducts();
    if (!query) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }

  async filterByCategory(categoryId) {
    const products = await this.getAllProducts();
    if (!categoryId) return products;
    
    return products.filter(p => p.categoryId === parseInt(categoryId));
  }
}

export default new ProductService();
