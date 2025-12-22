import { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [status, setStatus] = useState({ loading: false, error: null, success: false });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: false });

        // Minimal validation
        if (!formData.email || !formData.password) {
            setStatus({ loading: false, error: 'Please fill in all fields', success: false });
            return;
        }

        try {
            // API call
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Success implementation: Store token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // Optional: store user info

            setStatus({ loading: false, error: null, success: true });

            // Feedback to user (replace with navigation if router exists)
            alert(`Welcome back! Token: ${data.token.substring(0, 10)}...`);
            // window.location.href = '/dashboard'; // Uncomment to redirect

        } catch (err) {
            setStatus({ loading: false, error: err.message, success: false });
        }
    };

    // Styles (Clean UI)
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            fontFamily: "'Inter', sans-serif" // Assuming Inter might be available or fallback
        },
        card: {
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            width: '100%',
            maxWidth: '400px'
        },
        header: {
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#111827'
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
        },
        subtitle: {
            color: '#6b7280',
            fontSize: '0.875rem'
        },
        formGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.5rem'
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '0.875rem',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box' // Important for padding
        },
        button: {
            width: '100%',
            backgroundColor: '#2563eb', // Modern blue
            color: 'white',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: status.loading ? 'not-allowed' : 'pointer',
            opacity: status.loading ? 0.7 : 1,
            transition: 'background-color 0.2s'
        },
        error: {
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            padding: '0.75rem',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            textAlign: 'center'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Welcome Back</h2>
                    <p style={styles.subtitle}>Please enter your details to sign in</p>
                </div>

                {status.error && (
                    <div style={styles.error}>
                        {status.error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="email">Email</label>
                        <input
                            style={styles.input}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="password">Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            required
                        />
                    </div>

                    <button style={styles.button} type="submit" disabled={status.loading}>
                        {status.loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
