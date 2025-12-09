import { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authControllers = {
  registerUser,
};
