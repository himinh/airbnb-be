import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	ParseEnumPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { Types } from "mongoose";
import { ParseObjectIdPipe } from "src/utils/parse-object-id.pipe";
import { stringIdToObjectId } from "src/utils/stringId_to_objectId";
import { GetAqp } from "~decorators/get-aqp.decorator";
import { GetCurrentUserId } from "~decorators/get-current-user-id.decorator";
import { Public } from "~decorators/public.decorator";
import { PaginationDto } from "~dto/pagination.dto";
import { ActionEnum } from "~enums/action.enum";
import { CreateListingDto } from "./dto/create-listing.dto";
import { UpdateListingDto } from "./dto/update-listing.dto";
import { ListingService } from "./listing.service";

@Controller("listings")
export class ListingController {
	constructor(private readonly listingService: ListingService) {}

	//  ----- Method: GET -----
	@Public()
	@Get("/paginate")
	async paginate(@GetAqp() { filter, ...options }: PaginationDto) {
		return this.listingService.paginate(filter, options);
	}

	@Public()
	@Get("/:id")
	async findOneById(
		@Param("id", ParseObjectIdPipe) id: Types.ObjectId,
		@GetAqp() { projection, populate }: PaginationDto,
	) {
		return this.listingService.findById(id, { projection, populate });
	}

	//  ----- Method: POST -----
	@Post("/")
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() body: CreateListingDto) {
		return this.listingService.create(body);
	}

	//  ----- Method: PATCH -----
	@Patch("/:id/wishlist/:action")
	@HttpCode(HttpStatus.OK)
	async addToWishlist(
		@GetCurrentUserId() userId: Types.ObjectId,
		@Param("id", ParseObjectIdPipe) listingId: Types.ObjectId,
		@Param("action", new ParseEnumPipe(ActionEnum)) action: ActionEnum,
	) {
		switch (action) {
			case ActionEnum.Add:
				return this.listingService.addToWishlist(userId, listingId);

			case ActionEnum.Remove:
				return this.listingService.removeFromWishlist(userId, listingId);

			default:
				throw new NotFoundException("Action not found!");
		}
	}

	@Patch("/:id")
	@HttpCode(HttpStatus.OK)
	async update(
		@Param("id", ParseObjectIdPipe) id: Types.ObjectId,
		@Body() body: UpdateListingDto,
	) {
		const found = await this.listingService.findById(id);

		if (!found) throw new NotFoundException("Listing not found!");

		return this.listingService.updateById(id, body);
	}

	//  ----- Method: DELETE -----
	@Delete("/:ids/ids")
	@HttpCode(HttpStatus.OK)
	async deleteManyByIds(@Param("ids") ids: string) {
		return this.listingService.deleteMany({
			_id: { $in: ids.split(",").map((id) => stringIdToObjectId(id)) },
		});
	}

	@Delete("/:id")
	@HttpCode(HttpStatus.OK)
	async delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
		return this.listingService.deleteById(id);
	}
}
