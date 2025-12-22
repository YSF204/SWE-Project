import React, { useState } from 'react';

// --- Strategy Pattern Implementation ---

// Strategy Interface (Implicit in JS)
// method: send(contactInfo)

class EmailStrategy {
    send(email) {
        if (!email.includes('@')) throw new Error("Invalid email address");
        console.log(`Sending verification code to Email: ${email}`);
        return `Code sent to Email: ${email}`;
    }
}

class WhatsAppStrategy {
    send(phone) {
        if (phone.length < 10) throw new Error("Invalid phone number");
        console.log(`Sending verification code to WhatsApp: ${phone}`);
        return `Code sent to WhatsApp: ${phone}`;
    }
}

// Context
class VerificationContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    executeStrategy(contactInfo) {
        return this.strategy.send(contactInfo);
    }
}

// --- React Component ---

const VerificationComponent = () => {
    const [method, setMethod] = useState('email'); // 'email' or 'whatsapp'
    const [contactInfo, setContactInfo] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = () => {
        try {
            let strategy;
            if (method === 'email') {
                strategy = new EmailStrategy();
            } else {
                strategy = new WhatsAppStrategy();
            }

            const context = new VerificationContext(strategy);
            const result = context.executeStrategy(contactInfo);

            setMessage(result);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Verification System</h2>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ marginRight: '10px' }}>
                    <input
                        type="radio"
                        value="email"
                        checked={method === 'email'}
                        onChange={(e) => setMethod(e.target.value)}
                    />
                    Email
                </label>
                <label>
                    <input
                        type="radio"
                        value="whatsapp"
                        checked={method === 'whatsapp'}
                        onChange={(e) => setMethod(e.target.value)}
                    />
                    WhatsApp
                </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <input
                    type={method === 'email' ? 'email' : 'tel'}
                    placeholder={method === 'email' ? 'Enter Email' : 'Enter Phone Number'}
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            <button onClick={handleSend} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Send Code
            </button>

            {message && (
                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default VerificationComponent;
