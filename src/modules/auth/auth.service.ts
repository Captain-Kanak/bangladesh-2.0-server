import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import envConfig from "../../config/envConfig";

const registerUser = async (payload: Record<string, unknown>) => {
  const { name, email, password } = payload;

  try {
    const userExistsResult = await pool.query(
      `
        SELECT *
        FROM users
        WHERE email = $1
      `,
      [email]
    );

    if (userExistsResult.rows.length > 0) {
      return {
        success: false,
        message: "User with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const registerResult = await pool.query(
      `
        INSERT INTO users (
          name,
          email,
          password
        )
        VALUES ($1, $2, $3)
        RETURNING id, name, email, role, phone, date_of_birth, created_at, updated_at
      `,
      [name, email, hashedPassword]
    );

    if (registerResult.rows.length === 0) {
      return {
        success: false,
        message: "User registration failed",
      };
    }

    return {
      success: true,
      message: "User registered successfully",
      data: registerResult.rows[0],
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const loginUser = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;
  try {
    const userResult = await pool.query(
      `
        SELECT *
        FROM users
        WHERE email = $1
      `,
      [email]
    );

    if (userResult.rows.length === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(
      password as string,
      user.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      envConfig.jwtSecret as string,
      {
        expiresIn: "1d",
      }
    );
    return {
      success: true,
      message: "Login successful",
      data: {
        token,
        user,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const authServices = {
  registerUser,
  loginUser,
};
