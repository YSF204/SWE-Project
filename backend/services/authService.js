import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import repository from '../repository.js';

const JWT_SECRET = 'your-secret-key-change-in-production';

// Strategy Pattern - Verification Strategy
class VerificationStrategy {
  verify(user) {
    throw new Error('verify method must be implemented');
  }
}

class EmailVerificationStrategy extends VerificationStrategy {
  verify(user) {
    console.log(`Email verification sent to: ${user.email}`);
    return { method: 'email', verified: true };
  }
}

class WhatsAppVerificationStrategy extends VerificationStrategy {
  verify(user) {
    console.log(`WhatsApp verification sent to: ${user.email}`);
    return { method: 'whatsapp', verified: true };
  }
}

// Service Layer - Business Logic
class AuthService {
  constructor() {
    this.verificationStrategy = new EmailVerificationStrategy();
  }

  setVerificationStrategy(strategy) {
    this.verificationStrategy = strategy;
  }

  async register(userData) {
    const { name, email, password, role = 'customer' } = userData;

    // Check if user exists
    const existingUser = await repository.findOne('users', { email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await repository.create('users', {
      name,
      email,
      password: hashedPassword,
      role,
      verified: false
    });

    // Apply verification strategy
    const verification = this.verificationStrategy.verify(user);

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      verification
    };
  }

  async login(email, password) {
    // Find user
    const user = await repository.findOne('users', { email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export default new AuthService();
