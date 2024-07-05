import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "gifts",
})
export class Gift {
	@Prop({ type: Types.ObjectId, required: true })
	userId: Types.ObjectId;

	@Prop({ type: String, required: true })
	recipientEmail: string;

	@Prop({ type: Number, required: true })
	amount: number;

	@Prop({ type: String, required: true })
	message: string;
}

export type GiftDocument = Gift & HydratedDocument<Gift>;
export const GiftSchema = SchemaFactory.createForClass(Gift);
