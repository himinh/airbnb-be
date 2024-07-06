import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Listing } from "~modules/2-listings/schemas/listing.schema";
import { User } from "~modules/pre-built/1-users/schemas/user.schema";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "bookings",
})
export class Booking {
	@Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
	userId: Types.ObjectId;

	@Prop({ type: SchemaTypes.ObjectId, ref: Listing.name, required: true })
	listingId: Types.ObjectId;

	@Prop({ type: Date, required: true })
	startDate: Date;

	@Prop({ type: Date, required: true })
	endDate: Date;

	@Prop({ type: Number, required: true })
	totalPrice: number;
}

export type BookingDocument = Booking & HydratedDocument<Booking>;
export const BookingSchema = SchemaFactory.createForClass(Booking);
