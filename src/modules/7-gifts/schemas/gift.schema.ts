import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "gifts",
})
export class Gift {
	userId;
	recipientEmail;
	amount;
	message;
}

export type GiftDocument = Gift & HydratedDocument<Gift>;
export const GiftSchema = SchemaFactory.createForClass(Gift);
