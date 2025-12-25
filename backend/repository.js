import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'database.json');

// Repository Pattern - Data Access Layer
class Repository {
  async readDB() {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  }

  async writeDB(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async getAll(collection) {
    const db = await this.readDB();
    return db[collection] || [];
  }

  async getById(collection, id) {
    const items = await this.getAll(collection);
    return items.find(item => item.id === parseInt(id));
  }

  async create(collection, item) {
    const db = await this.readDB();
    const items = db[collection] || [];
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    const newItem = { id: newId, ...item };
    db[collection] = [...items, newItem];
    await this.writeDB(db);
    return newItem;
  }

  async update(collection, id, updates) {
    const db = await this.readDB();
    const items = db[collection] || [];
    const index = items.findIndex(item => item.id === parseInt(id));
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    db[collection] = items;
    await this.writeDB(db);
    return items[index];
  }

  async delete(collection, id) {
    const db = await this.readDB();
    const items = db[collection] || [];
    const filtered = items.filter(item => item.id !== parseInt(id));
    if (filtered.length === items.length) return false;
    db[collection] = filtered;
    await this.writeDB(db);
    return true;
  }

  async findOne(collection, query) {
    const items = await this.getAll(collection);
    return items.find(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }
}

export default new Repository();
