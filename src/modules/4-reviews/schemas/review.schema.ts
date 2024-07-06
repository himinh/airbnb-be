import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Listing } from "~modules/2-listings/schemas/listing.schema";
import { User } from "~modules/pre-built/1-users/schemas/user.schema";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "reviews",
})
export class Review {
	@Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
	userId: Types.ObjectId;

	@Prop({ type: SchemaTypes.ObjectId, ref: Listing.name, required: true })
	listingId: Types.ObjectId;

	@Prop({ type: Number, required: true })
	rating: number;

	@Prop({ type: String })
	comment?: string;
}

export type ReviewDocument = Review & HydratedDocument<Review>;
export const ReviewSchema = SchemaFactory.createForClass(Review);
