import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { IsObjectId, ToObjectId } from "~common/validators/objectId";

export class CreateWishlistDto {
	@IsNotEmpty()
	@IsObjectId()
	@ToObjectId()
	listingId: Types.ObjectId;

	userId: Types.ObjectId;
}
