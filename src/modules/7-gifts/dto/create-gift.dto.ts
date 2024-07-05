import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateGiftDto {
	@IsNotEmpty()
	@IsString()
	@Transform(({ value }) => new ObjectId(value))
	userId: ObjectId;

	@IsNotEmpty()
	@IsEmail()
	recipientEmail: string;

	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@IsNotEmpty()
	@IsString()
	message: string;
}
