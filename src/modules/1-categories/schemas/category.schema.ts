import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "categories",
})
export class Category {
	@Prop({ type: String, required: true })
	image: string;

	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: Number, unique: true })
	position?: number;

	@Prop({ type: Boolean, default: true })
	isShow: boolean;
}

export type CategoryDocument = Category & HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
