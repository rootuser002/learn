import { Request, Response } from 'express';
import { register, login } from '../services/auth.services';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const newUser = await register(username, password);
    res.status(201).json(newUser);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    res.status(200).json(result);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
