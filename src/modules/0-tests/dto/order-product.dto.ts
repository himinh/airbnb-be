import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Types } from "mongoose";
import { IsObjectId, ToObjectId } from "~common/validators/objectId";

export class OrderProductDto {
	@IsNotEmpty()
	@IsObjectId()
	@ToObjectId()
	productId: Types.ObjectId;

	@IsNotEmpty()
	@IsNumber()
	quantity: number;

	@IsOptional()
	@IsNumber()
	mass?: number;

	@IsOptional()
	@IsNumber()
	price?: number;
}
