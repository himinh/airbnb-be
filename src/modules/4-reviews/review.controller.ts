import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { Types } from "mongoose";
import { ParseObjectIdPipe } from "src/utils/parse-object-id.pipe";
import { stringIdToObjectId } from "src/utils/stringId_to_objectId";
import { GetAqp } from "~decorators/get-aqp.decorator";
import { GetCurrentUserId } from "~decorators/get-current-user-id.decorator";
import { PaginationDto } from "~dto/pagination.dto";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewService } from "./review.service";

@Controller("reviews")
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	//  ----- Method: GET -----
	@Get("/paginate")
	async paginate(@GetAqp() { filter, ...options }: PaginationDto) {
		return this.reviewService.paginate(filter, options);
	}

	@Get("/:id")
	async findOneById(
		@Param("id", ParseObjectIdPipe) id: Types.ObjectId,
		@GetAqp() { projection, populate }: PaginationDto,
	) {
		return this.reviewService.findById(id, { projection, populate });
	}

	@Get("/")
	async findMany(@GetAqp() { filter, ...options }: PaginationDto) {
		return this.reviewService.findMany(filter, options);
	}

	//  ----- Method: POST -----
	@Post("/")
	@HttpCode(HttpStatus.CREATED)
	async create(
		@GetCurrentUserId() userId: Types.ObjectId,
		@Body() body: CreateReviewDto,
	) {
		Object.assign(body, { userId });

		return this.reviewService.createReview(body);
	}

	//  ----- Method: PATCH -----
	@Patch("/:id")
	@HttpCode(HttpStatus.OK)
	async update(
		@GetCurrentUserId() userId: Types.ObjectId,
		@Param("id", ParseObjectIdPipe) id: Types.ObjectId,
		@Body() body: UpdateReviewDto,
	) {
		return this.reviewService.updateReviewById(id, { ...body, userId });
	}

	//  ----- Method: DELETE -----
	@Delete("/:ids/ids")
	@HttpCode(HttpStatus.OK)
	async deleteManyByIds(@Param("ids") ids: string) {
		const deleted = await Promise.allSettled(
			ids
				.split(",")
				.map((id) =>
					this.reviewService.deleteReviewById(stringIdToObjectId(id)),
				),
		);

		const deletedCount = deleted.filter(
			(item) => item.status === "fulfilled",
		).length;

		return {
			deletedCount,
			acknowledged: Boolean(deletedCount),
		};
	}

	@Delete("/:id")
	@HttpCode(HttpStatus.OK)
	async delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
		return this.reviewService.deleteReviewById(id);
	}
}
