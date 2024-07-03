import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "reviews",
})
export class Review {
	userId;
	listingId;
	rating;
	comment;
}

export type ReviewDocument = Review & HydratedDocument<Review>;
export const ReviewSchema = SchemaFactory.createForClass(Review);
