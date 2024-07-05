import { IsISO8601, IsNumber } from "class-validator";
import { Types } from "mongoose";
import { IsObjectId, ToObjectId } from "~common/validators/objectId";

export class CreateTestDto {
	@IsObjectId()
	@ToObjectId()
	userString: string;

	@IsObjectId()
	@ToObjectId()
	userId: Types.ObjectId;

	@IsISO8601()
	dateBirth: string;

	@IsNumber()
	position: number;
}
