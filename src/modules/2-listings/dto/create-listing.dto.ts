import {
	IsArray,
	IsDateString,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsString,
} from "class-validator";
import { Types } from "mongoose";
import { IsObjectId, ToObjectId } from "~common/validators/objectId";
import { ListingStatus } from "../enums/listing-status.enum";

export class CreateListingDto {
	@IsNotEmpty()
	@IsObjectId()
	@ToObjectId()
	hostId: Types.ObjectId;

	@IsNotEmpty()
	@IsArray()
	@IsMongoId({ each: true })
	categoryIds: Types.ObjectId[];

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsString()
	@IsEnum(ListingStatus)
	status: ListingStatus;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	@IsNotEmpty()
	@IsString()
	locationValue: string;

	@IsNotEmpty()
	@IsString()
	thumbnail: string;

	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true })
	images: string;

	@IsNotEmpty()
	@IsDateString()
	publishAt: Date;

	@IsNotEmpty()
	@IsNumber()
	guestCount: number;

	@IsNotEmpty()
	@IsNumber()
	roomCount: number;

	@IsNotEmpty()
	@IsNumber()
	bathroomCount: number;

	@IsNotEmpty()
	@IsNumber()
	reviewCount: number;
}
