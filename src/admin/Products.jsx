import React, { useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Sample Product', price: 100, category: 'Electronics' }
    ]);
    const [form, setForm] = useState({ name: '', price: '', category: '' });
    const [isEditing, setIsEditing] = useState(null);

    // Mock categories as per requirements
    const categories = ['Electronics', 'Clothing', 'Home', 'Books'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setProducts(products.map(p =>
                p.id === isEditing ? { ...form, id: isEditing } : p
            ));
            setIsEditing(null);
        } else {
            setProducts([...products, { ...form, id: Date.now() }]);
        }
        setForm({ name: '', price: '', category: '' });
    };

    const deleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const startEdit = (product) => {
        setForm(product);
        setIsEditing(product.id);
    };

    return (
        <div className="product-manager" style={{ padding: '20px' }}>
            <h2>Product Management</h2>

            {/* Product Form */}
            <div className="card" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                        style={{ padding: '8px' }}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: e.target.value })}
                        required
                        style={{ padding: '8px' }}
                    />
                    <select
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        required
                        style={{ padding: '8px' }}
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit">
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={() => { setIsEditing(null); setForm({ name: '', price: '', category: '' }); }}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Product List */}
            <div className="card">
                <h3>Product List</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #555', textAlign: 'left' }}>
                            <th style={{ padding: '10px' }}>Name</th>
                            <th style={{ padding: '10px' }}>Price</th>
                            <th style={{ padding: '10px' }}>Category</th>
                            <th style={{ padding: '10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>No products found.</td>
                            </tr>
                        ) : (
                            products.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #444' }}>
                                    <td style={{ padding: '10px' }}>{p.name}</td>
                                    <td style={{ padding: '10px' }}>${Number(p.price).toFixed(2)}</td>
                                    <td style={{ padding: '10px' }}>{p.category}</td>
                                    <td style={{ padding: '10px' }}>
                                        <button onClick={() => startEdit(p)} style={{ marginRight: '10px' }}>
                                            Edit
                                        </button>
                                        <button onClick={() => deleteProduct(p.id)} style={{ backgroundColor: '#aa3333' }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;