import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

@Schema({
	timestamps: true,
	versionKey: false,
	collection: "wishlists",
})
export class Wishlist {
	@Prop({ type: SchemaTypes.ObjectId, required: true })
	userId: Types.ObjectId;

	@Prop({ type: SchemaTypes.ObjectId, required: true })
	listingId: Types.ObjectId;
}

export type WishlistDocument = Wishlist & HydratedDocument<Wishlist>;
export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
