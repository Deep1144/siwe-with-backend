import User, { IUser, IUserDocument } from "models/User";
import mongoose from "mongoose";

export const createUser = async (payload: Partial<IUser>): Promise<IUser> => {
    try {
        return await User.create(payload);
    } catch (error: any) {
        throw new Error(error);
    }
}

export const handleLoginOrSignup = async (address: string): Promise<IUser> => {
    try {
        const user = await findUserByAddress(address);
        if (user) {
            // update last login at
            user.lastLoginAt = new Date()
            const res = await user.save();
            return res;
        } else {
            // create new user
            const userData: IUser = {
                walletAddress: address,
            }
            const user = await createUser(userData);

            return user;
        }
    } catch (error: any) {
        throw new Error(error);
    }
}


export const findUserByAddress = async (address: string) => {
    const user = await User.findOne<IUserDocument>({ walletAddress: address });
    return user;
}

export const findUserById = async (id: mongoose.ObjectId | string) => {
    const user = await User.findById<IUserDocument>(id);
    return user;
}

export const updateUser = async (id: string, body: IUser): Promise<IUser | null> => {
    try {
        return await User.findByIdAndUpdate(id, body, { new: true });
    } catch (error: any) {
        throw new Error(error);
    }
}
