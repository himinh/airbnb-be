import { IsISO8601, IsMongoId, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class CreateTripDto {
	@IsMongoId()
	userString: string;

	@IsMongoId()
	userId: Types.ObjectId;

	@IsISO8601()
	dateBirth: string;

	@IsNumber()
	position: number;
}
