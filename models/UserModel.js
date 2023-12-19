import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		provider: {
			type: String,
			enum: ["google", "github", "local"],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("User", userSchema);
