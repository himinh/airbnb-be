import { IsDateString, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { IsObjectId, ToObjectId } from "src/common/validators/objectId";

export class CreateTripDto {
	@IsNotEmpty()
	@IsObjectId()
	@ToObjectId()
	@ToObjectId()
	userId: Types.ObjectId;

	@IsNotEmpty()
	@IsObjectId()
	@ToObjectId()
	bookingId: Types.ObjectId;

	@IsNotEmpty()
	@IsDateString()
	tripDate: string;
}
