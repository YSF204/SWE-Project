import React, { useState } from 'react';

// --- Mock Data ---

const INITIAL_CATEGORIES = [
    { id: 1, name: 'Electronics', color: '#3b82f6' }, // Blue
    { id: 2, name: 'Fashion', color: '#ec4899' },     // Pink
    { id: 3, name: 'Home & Living', color: '#10b981' }, // Emerald
    { id: 4, name: 'Sports', color: '#f59e0b' },      // Amber
];

const INITIAL_PRODUCTS = [
    { id: 101, name: 'Wireless Headphones', price: 199.99, image: '🎧', categoryId: 1 },
    { id: 102, name: 'Running Shoes', price: 89.50, image: '👟', categoryId: 4 },
    { id: 103, name: 'Smart Watch', price: 249.00, image: '⌚', categoryId: 1 },
    { id: 104, name: 'Denim Jacket', price: 59.99, image: '🧥', categoryId: 2 },
    { id: 105, name: 'Coffee Maker', price: 129.99, image: '☕', categoryId: 3 },
    { id: 106, name: 'Yoga Mat', price: 25.00, image: '🧘', categoryId: 4 },
    { id: 107, name: 'Gaming Mouse', price: 49.99, image: '🖱️', categoryId: null }, // Unassigned
    { id: 108, name: 'Desk Lamp', price: 34.50, image: '💡', categoryId: null },    // Unassigned
];

// --- Components ---

const CategoryBadge = ({ category, onClick, isSelected }) => {
    if (!category) return <span style={{ ...styles.badge, backgroundColor: '#9ca3af' }}>Unassigned</span>;

    return (
        <span
            onClick={onClick}
            style={{
                ...styles.badge,
                backgroundColor: category.color,
                border: isSelected ? '2px solid white' : '2px solid transparent',
                boxShadow: isSelected ? '0 0 0 2px #6366f1' : 'none',
                cursor: onClick ? 'pointer' : 'default',
                opacity: onClick && !isSelected ? 0.7 : 1,
            }}
        >
            {category.name}
        </span>
    );
};

export default function BelongCategory() {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [categories] = useState(INITIAL_CATEGORIES);
    const [filterCategory, setFilterCategory] = useState('ALL');

    const handleCategoryChange = (productId, newCategoryId) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId
                    ? { ...p, categoryId: Number(newCategoryId) }
                    : p
            )
        );
    };

    const getCategoryById = (id) => categories.find(c => c.id === id);

    const filteredProducts = filterCategory === 'ALL'
        ? products
        : products.filter(p =>
            filterCategory === 'UNASSIGNED'
                ? p.categoryId === null
                : p.categoryId === filterCategory
        );

    // --- Styles ---
    // Using JS styles for simplicity as requested to write only in this file.
    // In a real app, these would be in CSS/Tailwind classes.

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>Product Category Management</h1>
                    <p style={styles.subtitle}>Manage product catalog and category associations</p>
                </div>
                <div style={styles.stats}>
                    <div style={styles.statItem}>
                        <span style={styles.statValue}>{products.length}</span>
                        <span style={styles.statLabel}>Total Products</span>
                    </div>
                    <div style={styles.statItem}>
                        <span style={styles.statValue}>{categories.length}</span>
                        <span style={styles.statLabel}>Categories</span>
                    </div>
                </div>
            </header>

            <div style={styles.mainContent}>
                {/* Filters Sidebar */}
                <aside style={styles.sidebar}>
                    <h3 style={styles.sectionTitle}>Filter by Category</h3>
                    <div style={styles.filterList}>
                        <button
                            style={{ ...styles.filterButton, ...(filterCategory === 'ALL' ? styles.filterButtonActive : {}) }}
                            onClick={() => setFilterCategory('ALL')}
                        >
                            All Products
                        </button>
                        <button
                            style={{ ...styles.filterButton, ...(filterCategory === 'UNASSIGNED' ? styles.filterButtonActive : {}) }}
                            onClick={() => setFilterCategory('UNASSIGNED')}
                        >
                            ⚠️ Unassigned ({products.filter(p => !p.categoryId).length})
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                style={{
                                    ...styles.filterButton,
                                    ...(filterCategory === cat.id ? styles.filterButtonActive : {}),
                                    borderLeft: `4px solid ${cat.color}`
                                }}
                                onClick={() => setFilterCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Product Grid */}
                <section style={styles.gridContainer}>
                    {filteredProducts.length === 0 ? (
                        <div style={styles.emptyState}>No products found.</div>
                    ) : (
                        <div style={styles.grid}>
                            {filteredProducts.map(product => (
                                <div key={product.id} style={styles.card}>
                                    <div style={styles.cardHeader}>
                                        <div style={styles.icon}>{product.image}</div>
                                        <div style={styles.price}>${product.price.toFixed(2)}</div>
                                    </div>
                                    <h3 style={styles.productName}>{product.name}</h3>

                                    <div style={styles.cardBody}>
                                        <label style={styles.label}>Category</label>
                                        <div style={styles.selectWrapper}>
                                            <select
                                                value={product.categoryId || ''}
                                                onChange={(e) => handleCategoryChange(product.id, e.target.value)}
                                                style={styles.select}
                                            >
                                                <option value="" disabled>Select Category...</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            <div style={styles.categoryIndicator}>
                                                <CategoryBadge category={getCategoryById(product.categoryId)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: '"Inter", "Segoe UI", sans-serif',
        backgroundColor: '#0f172a', // Slate 900
        color: '#f8fafc',
        minHeight: '100vh',
        padding: '2rem',
    },
    header: {
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid #1e293b',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '700',
        background: 'linear-gradient(to right, #818cf8, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: 0,
    },
    subtitle: {
        color: '#94a3b8',
        marginTop: '0.5rem',
    },
    stats: {
        display: 'flex',
        gap: '2rem',
    },
    statItem: {
        textAlign: 'center',
    },
    statValue: {
        display: 'block',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#e2e8f0',
    },
    statLabel: {
        fontSize: '0.875rem',
        color: '#64748b',
    },
    mainContent: {
        display: 'flex',
        gap: '2rem',
    },
    sidebar: {
        width: '250px',
        flexShrink: 0,
    },
    sectionTitle: {
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#64748b',
        marginBottom: '1rem',
    },
    filterList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    filterButton: {
        background: 'transparent',
        border: '1px solid transparent',
        color: '#cbd5e1',
        padding: '0.75rem 1rem',
        textAlign: 'left',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    filterButtonActive: {
        backgroundColor: '#1e293b',
        color: '#fff',
        fontWeight: '600',
    },
    gridContainer: {
        flexGrow: 1,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        backgroundColor: '#1e293b',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
    },
    icon: {
        fontSize: '2.5rem',
        background: '#334155',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.75rem',
    },
    price: {
        fontWeight: '600',
        color: '#4ade80', // Green 400
        fontSize: '1.125rem',
    },
    productName: {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        color: '#f1f5f9',
    },
    cardBody: {
        marginTop: 'auto',
    },
    label: {
        display: 'block',
        fontSize: '0.75rem',
        color: '#94a3b8',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
    },
    selectWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    select: {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '0.375rem',
        border: '1px solid #475569',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontSize: '0.875rem',
    },
    categoryIndicator: {
        marginTop: '0.5rem',
    },
    badge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'inline-block',
        textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem',
        color: '#64748b',
        fontSize: '1.125rem',
        backgroundColor: '#1e293b',
        borderRadius: '1rem',
        border: '2px dashed #334155',
    }
};
