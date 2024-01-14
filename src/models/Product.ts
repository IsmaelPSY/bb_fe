import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema(
	{
		title: { type: String, require: true },
		description: { type: String },
		image_urls: [{ type: String }],
		category: { type: String },
		size: { type: String },
		gender: { type: String },
		price: { type: Number, required: true },
		available: { type: Boolean, default: true }
	},
	{
		timestamps: true,
	}
)

// Fixed issue with model already created
export const Product = models?.Product || model('Product', ProductSchema)