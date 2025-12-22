import productService from '../services/productService.js';

// MVC Pattern - Controller Layer
class ProductController {
  async getAll(req, res) {
    try {
      const { search, categoryId } = req.query;
      
      let products;
      if (search) {
        products = await productService.searchProducts(search);
      } else if (categoryId) {
        products = await productService.filterByCategory(categoryId);
      } else {
        products = await productService.getAllProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new ProductController();
