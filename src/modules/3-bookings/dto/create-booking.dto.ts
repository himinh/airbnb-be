import { IsDateString, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { IsObjectId, ToObjectId } from "~common/validators/objectId";

export class CreateBookingDto {
	@IsNotEmpty()
	@IsObjectId()
	@ToObjectId()
	userId: Types.ObjectId;

	@IsNotEmpty()
	@IsObjectId()
	@ToObjectId()
	listingId: Types.ObjectId;

	@IsNotEmpty()
	@IsDateString()
	startDate: Date;

	@IsNotEmpty()
	@IsDateString()
	endDate: Date;
}
