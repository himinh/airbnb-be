import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";

export class CreateCategoryDto {
	@IsNotEmpty()
	@IsString()
	image: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	category?: string;

	@IsOptional()
	@IsNumber()
	position?: number;

	@IsOptional()
	@IsBoolean()
	isShow: boolean = true;
}
