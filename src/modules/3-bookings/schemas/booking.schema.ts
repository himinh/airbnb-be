import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "bookings",
})
export class Booking {
	@Prop({ type: SchemaTypes.ObjectId, required: true })
	userId: Types.ObjectId;

	@Prop({ type: SchemaTypes.ObjectId, required: true })
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
