import React, { useState, useEffect } from 'react';

const SearchByCategory = () => {
    // Mock Categories - Synced with BelongCategory.jsx
    const categories = [
        { id: 'ALL', name: 'All Categories' },
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Fashion' },
        { id: 3, name: 'Home & Living' },
        { id: 4, name: 'Sports' }
    ];

    // Mock Products
    const mockProducts = [
        { id: 1, name: 'Wireless Headphones', category: 1, price: 99.99, image: 'https://placehold.co/300x200?text=Headphones' },
        { id: 2, name: 'Smart Watch', category: 1, price: 149.50, image: 'https://placehold.co/300x200?text=Smart+Watch' },
        { id: 3, name: 'Running Shoes', category: 4, price: 79.99, image: 'https://placehold.co/300x200?text=Running+Shoes' },
        { id: 4, name: 'Cotton T-Shirt', category: 2, price: 24.99, image: 'https://placehold.co/300x200?text=T-Shirt' },
        { id: 5, name: 'Coffee Maker', category: 3, price: 129.00, image: 'https://placehold.co/300x200?text=Coffee+Maker' },
        { id: 6, name: 'Desk Lamp', category: 3, price: 45.00, image: 'https://placehold.co/300x200?text=Desk+Lamp' },
        { id: 8, name: 'Yoga Mat', category: 4, price: 29.99, image: 'https://placehold.co/300x200?text=Yoga+Mat' },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [filteredProducts, setFilteredProducts] = useState(mockProducts);

    useEffect(() => {
        const results = mockProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredProducts(results);
    }, [searchTerm, selectedCategory]);

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: '#333'
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px'
        },
        title: {
            fontSize: '2.5rem',
            color: '#2c3e50',
            marginBottom: '10px'
        },
        subtitle: {
            color: '#7f8c8d',
            fontSize: '1.1rem'
        },
        controls: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
            flexWrap: 'wrap'
        },
        input: {
            padding: '12px 20px',
            fontSize: '1rem',
            borderRadius: '25px',
            border: '1px solid #ddd',
            width: '300px',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            transition: 'box-shadow 0.3s'
        },
        select: {
            padding: '12px 20px',
            fontSize: '1rem',
            borderRadius: '25px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px',
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'pointer',
            border: '1px solid #f0f0f0'
        },
        cardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
        },
        imageContainer: {
            height: '200px',
            overflow: 'hidden',
            backgroundColor: '#f9f9f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        cardBody: {
            padding: '20px'
        },
        categoryTag: {
            fontSize: '0.8rem',
            color: '#3498db',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginBottom: '5px'
        },
        productName: {
            fontSize: '1.2rem',
            margin: '0 0 10px 0',
            fontWeight: '600'
        },
        price: {
            fontSize: '1.3rem',
            color: '#e74c3c',
            fontWeight: 'bold'
        },
        noResults: {
            textAlign: 'center',
            width: '100%',
            padding: '50px',
            color: '#95a5a6',
            fontSize: '1.2rem'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Explore Our Products</h1>
                <p style={styles.subtitle}>Find the best items tailored just for you</p>
            </div>

            <div style={styles.controls}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                    style={styles.select}
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div style={styles.grid}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div
                            key={product.id}
                            style={styles.card}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = styles.cardHover.transform;
                                e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = styles.card.boxShadow;
                            }}
                        >
                            <div style={styles.imageContainer}>
                                <img src={product.image} alt={product.name} style={styles.image} />
                            </div>
                            <div style={styles.cardBody}>
                                <div style={styles.categoryTag}>{categories.find(c => c.id === product.category)?.name}</div>
                                <h3 style={styles.productName}>{product.name}</h3>
                                <div style={styles.price}>${product.price.toFixed(2)}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={styles.noResults}>
                        <p>No products found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchByCategory;
