import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { IsObjectId, ToObjectId } from "~common/validators/objectId";

export class CreateReviewDto {
	@IsNotEmpty()
	@IsObjectId()
	@ToObjectId()
	userId: Types.ObjectId;

	@IsNotEmpty()
	@IsObjectId()
	@ToObjectId()
	listingId: Types.ObjectId;

	@IsNotEmpty()
	@IsNumber()
	rating: number;

	@IsOptional()
	@IsString()
	comment?: string;
}
