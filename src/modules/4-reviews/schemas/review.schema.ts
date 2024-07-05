import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "reviews",
})
export class Review {
	@Prop({ type: SchemaTypes.ObjectId, required: true })
	userId: Types.ObjectId;

	@Prop({ type: SchemaTypes.ObjectId, required: true })
	listingId: Types.ObjectId;

	@Prop({ type: Number, required: true })
	rating: number;

	@Prop({ type: String })
	comment?: string;
}

export type ReviewDocument = Review & HydratedDocument<Review>;
export const ReviewSchema = SchemaFactory.createForClass(Review);
