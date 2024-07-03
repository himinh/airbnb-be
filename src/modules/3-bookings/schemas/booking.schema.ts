import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "bookings",
})
export class Booking {
	userId: Types.ObjectId;
	listingId: Types.ObjectId;
	startDate;
	endDate;
	totalPrice;
}

export type BookingDocument = Booking & HydratedDocument<Booking>;
export const BookingSchema = SchemaFactory.createForClass(Booking);
