import { useState, useEffect } from 'react';
import api from '../services/api';
import './Admin.css';

const CRUDforCategories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setMessage('Category name is required');
      return;
    }

    setLoading(true);
    try {
      await api.createCategory(formData);
      setFormData({ name: '', description: '' });
      setMessage('Category created successfully!');
      await fetchCategories();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setMessage('Category name is required');
      return;
    }

    setLoading(true);
    try {
      await api.updateCategory(editingId, formData);
      setFormData({ name: '', description: '' });
      setEditingId(null);
      setMessage('Category updated successfully!');
      await fetchCategories();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await api.deleteCategory(id);
      setMessage('Category deleted successfully!');
      await fetchCategories();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const startEdit = (category) => {
    setEditingId(category.id);
    setFormData({ name: category.name, description: category.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
  };

  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        <h1 className="admin-title">Category Management</h1>

        {message && (
          <div className={message.includes('success') ? 'success-msg' : 'error-msg'}>
            {message}
          </div>
        )}

        <div className="admin-card">
          <h2 className="card-title">{editingId ? 'Edit Category' : 'Add New Category'}</h2>
          <form onSubmit={editingId ? handleUpdate : handleCreate} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter category name"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter category description"
                rows="3"
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : (editingId ? 'Update Category' : 'Create Category')}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-card">
          <h2 className="card-title">Categories ({categories.length})</h2>
          
          {categories.length === 0 ? (
            <p className="empty-message">No categories yet. Create one above!</p>
          ) : (
            <div className="category-list">
              {categories.map(category => (
                <div key={category.id} className="category-item">
                  <div className="category-info">
                    <h3>{category.name}</h3>
                    <p>{category.description || 'No description'}</p>
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => startEdit(category)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(category.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRUDforCategories;
