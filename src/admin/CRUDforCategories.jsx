import { useState } from 'react';

const CRUDforCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets' },
    { id: 2, name: 'Clothing', description: 'Fashion and apparel' },
    { id: 3, name: 'Books', description: 'Books and literature' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // CREATE - Add new category
  const handleCreate = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setMessage('Category name is required');
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: formData.name,
      description: formData.description
    };

    setCategories([...categories, newCategory]);
    setFormData({ name: '', description: '' });
    setMessage('Category created successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  // UPDATE - Edit existing category
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setMessage('Category name is required');
      return;
    }

    setCategories(categories.map(cat => 
      cat.id === editingId 
        ? { ...cat, name: formData.name, description: formData.description }
        : cat
    ));

    setFormData({ name: '', description: '' });
    setEditingId(null);
    setMessage('Category updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  // DELETE - Remove category
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
      setMessage('Category deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Start editing a category
  const startEdit = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Category Management</h1>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        {/* CREATE/UPDATE FORM */}
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={editingId ? handleUpdate : handleCreate} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter category name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="Enter category description"
                rows="3"
              />
            </div>

            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.submitButton}>
                {editingId ? 'Update Category' : 'Create Category'}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} style={styles.cancelButton}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* CATEGORIES LIST */}
        <div style={styles.listCard}>
          <h2 style={styles.listTitle}>Categories ({categories.length})</h2>
          
          {categories.length === 0 ? (
            <p style={styles.emptyMessage}>No categories yet. Create one above!</p>
          ) : (
            <div style={styles.categoryList}>
              {categories.map(category => (
                <div key={category.id} style={styles.categoryItem}>
                  <div style={styles.categoryInfo}>
                    <h3 style={styles.categoryName}>{category.name}</h3>
                    <p style={styles.categoryDescription}>
                      {category.description || 'No description'}
                    </p>
                  </div>
                  <div style={styles.actionButtons}>
                    <button 
                      onClick={() => startEdit(category)} 
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)} 
                      style={styles.deleteButton}
                    >
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

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  },
  wrapper: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '32px'
  },
  message: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px 20px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '500'
  },
  formCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  formTitle: {
    marginBottom: '20px',
    color: '#333',
    fontSize: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555'
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none'
  },
  textarea: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  submitButton: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  listCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  listTitle: {
    marginBottom: '20px',
    color: '#333',
    fontSize: '20px'
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    padding: '40px 0'
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    border: '1px solid #e0e0e0'
  },
  categoryInfo: {
    flex: 1
  },
  categoryName: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    color: '#333'
  },
  categoryDescription: {
    margin: 0,
    fontSize: '14px',
    color: '#666'
  },
  actionButtons: {
    display: 'flex',
    gap: '10px'
  },
  editButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default CRUDforCategories;
