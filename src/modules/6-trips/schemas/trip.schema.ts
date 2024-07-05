import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "trips",
})
export class Trip {
	@Prop({ type: SchemaTypes.ObjectId, required: true })
	userId: Types.ObjectId;

	@Prop({ type: SchemaTypes.ObjectId, required: true })
	bookingId: Types.ObjectId;

	@Prop({ type: Date, required: true })
	tripDate: Date;
}

export type TripDocument = Trip & HydratedDocument<Trip>;
export const TripSchema = SchemaFactory.createForClass(Trip);
