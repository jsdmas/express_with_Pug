import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { model, Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    avatarUrl: String,
    socialOnly: { type: Boolean, default: false },
    username: { type: String, required: true, unique: true },
    password: String,
    name: { type: String, required: true },
    location: String,
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
});

const User = new model("User", userSchema);

export default User;