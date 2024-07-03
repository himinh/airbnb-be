import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "trips",
})
export class Trip {
	userId;
	bookingId;
	tripDate;
}

export type TripDocument = Trip & HydratedDocument<Trip>;
export const TripSchema = SchemaFactory.createForClass(Trip);
