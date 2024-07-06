import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Category } from "~modules/1-categories/schemas/category.schema";
import { User } from "~modules/pre-built/1-users/schemas/user.schema";
import { ListingStatus } from "../enums/listing-status.enum";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "listings",
})
export class Listing {
	@Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
	hostId: Types.ObjectId;

	@Prop({
		type: [{ type: SchemaTypes.ObjectId, ref: Category.name }],
		required: true,
	})
	categoryIds: Types.ObjectId[];

	@Prop({ type: String, required: true })
	title: string;

	@Prop({ type: String, required: true })
	description: string;

	@Prop({ type: String, enum: ListingStatus, required: true })
	status: ListingStatus;

	@Prop({ type: Number, required: true })
	price: number;

	@Prop({ type: String, required: true })
	locationValue: string;

	@Prop({ type: String, required: true })
	thumbnail: string;

	@Prop({ type: [String], required: true })
	images: string;

	@Prop({ type: Date, required: true })
	publishAt: Date;

	@Prop({ type: Number, required: true })
	guestCount: number;

	@Prop({ type: Number, required: true })
	roomCount: number;

	@Prop({ type: Number, required: true })
	bathroomCount: number;

	@Prop({ type: Number })
	reviewCount?: number;

	@Prop({ type: Number })
	totalReviewRatings?: number;

	@Prop({ type: Number })
	viewedCount?: number;
}

export type ListingDocument = Listing & HydratedDocument<Listing>;
export const ListingSchema = SchemaFactory.createForClass(Listing);
