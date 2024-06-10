import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const register = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return newUser;
};

export const login = async (username: string, password: string) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '4h' });
    const refresh_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    const userObj: any = user.toObject();
    delete userObj.password;

    return { access_token, refresh_token, user: userObj };
};
