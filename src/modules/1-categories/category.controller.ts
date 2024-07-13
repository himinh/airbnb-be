import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { Types } from "mongoose";
import { ParseObjectIdPipe } from "src/utils/parse-object-id.pipe";
import { stringIdToObjectId } from "src/utils/stringId_to_objectId";
import { GetAqp } from "~decorators/get-aqp.decorator";
import { Public } from "~decorators/public.decorator";
import { PaginationDto } from "~dto/pagination.dto";
import { ListingService } from "~modules/2-listings/listing.service";
import { UserService } from "~modules/pre-built/1-users/user.service";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

// const data = [
// 	{
// 		image:
// 			"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
// 		name: "Icons",
// 		position: 0,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
// 		name: "Lakefront",
// 		position: 1,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
// 		name: "Cabins",
// 		position: 2,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
// 		name: "Design",
// 		position: 3,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
// 		name: "Tropical",
// 		position: 4,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg",
// 		name: "Camping",
// 		position: 5,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
// 		name: "Amazing views",
// 		position: 6,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
// 		name: "Rooms",
// 		position: 7,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
// 		name: "Amazing pools",
// 		position: 8,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
// 		name: "Beachfront",
// 		position: 9,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
// 		name: "Arctic",
// 		position: 10,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg",
// 		name: "Boats",
// 		position: 11,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/8eccb972-4bd6-43c5-ac83-27822c0d3dcd.jpg",
// 		name: "Grand pianos",
// 		position: 12,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
// 		name: "Mansions",
// 		position: 13,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg",
// 		name: "Earth homes",
// 		position: 14,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
// 		name: "Tiny homes",
// 		position: 15,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg",
// 		name: "A-frames",
// 		position: 16,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
// 		name: "OMG!",
// 		position: 17,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
// 		name: "National parks",
// 		position: 18,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
// 		name: "Chef's kitchens",
// 		position: 19,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
// 		name: "Islands",
// 		position: 20,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
// 		name: "Top cities",
// 		position: 21,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
// 		name: "Trending",
// 		position: 22,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
// 		name: "Castles",
// 		position: 23,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg",
// 		name: "Houseboats",
// 		position: 24,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg",
// 		name: "Golfing",
// 		position: 25,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
// 		name: "Countryside",
// 		position: 26,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
// 		name: "Treehouses",
// 		position: 27,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
// 		name: "Caves",
// 		position: 28,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
// 		name: "Luxe",
// 		position: 29,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg",
// 		name: "Campers",
// 		position: 30,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
// 		name: "Surfing",
// 		position: 31,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg",
// 		name: "New",
// 		position: 32,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg",
// 		name: "Bed & breakfasts",
// 		position: 33,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
// 		name: "Farms",
// 		position: 34,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg",
// 		name: "Vineyards",
// 		position: 35,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
// 		name: "Historical homes",
// 		position: 36,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg",
// 		name: "Skiing",
// 		position: 37,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg",
// 		name: "Hanoks",
// 		position: 38,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg",
// 		name: "Top of the world",
// 		position: 39,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/e4b12c1b-409b-4cb6-a674-7c1284449f6e.jpg",
// 		name: "Cycladic homes",
// 		position: 40,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg",
// 		name: "Domes",
// 		position: 41,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/827c5623-d182-474a-823c-db3894490896.jpg",
// 		name: "Ryokans",
// 		position: 42,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/747b326c-cb8f-41cf-a7f9-809ab646e10c.jpg",
// 		name: "Shepherd's huts",
// 		position: 43,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
// 		name: "Play",
// 		position: 44,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/251c0635-cc91-4ef7-bb13-1084d5229446.jpg",
// 		name: "Casas particulares",
// 		position: 45,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg",
// 		name: "Windmills",
// 		position: 46,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6.jpg",
// 		name: "Containers",
// 		position: 47,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049.jpg",
// 		name: "Minsus",
// 		position: 48,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/d721318f-4752-417d-b4fa-77da3cbc3269.jpg",
// 		name: "Towers",
// 		position: 49,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg",
// 		name: "Yurts",
// 		position: 50,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/f60700bc-8ab5-424c-912b-6ef17abc479a.jpg",
// 		name: "Barns",
// 		position: 51,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg",
// 		name: "Desert",
// 		position: 52,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg",
// 		name: "Ski-in/out",
// 		position: 53,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg",
// 		name: "Adapted",
// 		position: 54,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg",
// 		name: "Off-the-grid",
// 		position: 55,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg",
// 		name: "Creative spaces",
// 		position: 56,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/7ff6e4a1-51b4-4671-bc9a-6f523f196c61.jpg",
// 		name: "Riads",
// 		position: 57,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/c9157d0a-98fe-4516-af81-44022118fbc7.jpg",
// 		name: "Dammusi",
// 		position: 58,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg",
// 		name: "Trulli",
// 		position: 59,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
// 		name: "Beach",
// 		position: 60,
// 		isShow: true,
// 	},
// 	{
// 		image:
// 			"https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg",
// 		name: "Lake",
// 		position: 61,
// 		isShow: true,
// 	},
// ];

// export const listings = [
// 	{
// 		id: "1",
// 		title: "Beautiful Apartment in City Center",
// 		description: "A cozy apartment located in the heart of the city.",
// 		price: 100,
// 		imageUrl:
// 			"https://plus.unsplash.com/premium_photo-1663133679087-bc5deb50ab00?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// 		locationValue: "AI",
// 		guestCount: 2,
// 		roomCount: 1,
// 		bathroomCount: 1,
// 	},
// 	{
// 		id: "2",
// 		title: "Spacious House with Garden",
// 		description:
// 			"A lovely house with a beautiful garden, perfect for a family vacation.",
// 		price: 200,
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// 		locationValue: "AI",
// 		guestCount: 6,
// 		roomCount: 3,
// 		bathroomCount: 2,
// 	},
// 	{
// 		id: "3",
// 		title: "Luxurious Villa by the Beach",
// 		description:
// 			"An elegant villa situated by the beach, offering stunning ocean views.",
// 		price: 500,
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// 		locationValue: "AI",
// 		guestCount: 8,
// 		roomCount: 4,
// 		bathroomCount: 3,
// 	},
// 	{
// 		id: "4",
// 		title: "Cozy Loft in Historic District",
// 		description:
// 			"A charming loft nestled in the historic district, close to all attractions.",
// 		price: 80,
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// 		locationValue: "AI",
// 		guestCount: 2,
// 		roomCount: 1,
// 		bathroomCount: 1,
// 	},
// 	{
// 		id: "5",
// 		title: "Modern Condo with City View",
// 		description:
// 			"A modern condo with panoramic city views, perfect for urban living.",
// 		price: 150,
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// 		locationValue: "AI",
// 		guestCount: 4,
// 		roomCount: 2,
// 		bathroomCount: 2,
// 	},
// 	{
// 		id: "6",
// 		title: "Secluded Cottage in the Woods",
// 		description:
// 			"A cozy cottage hidden in the woods, ideal for a peaceful getaway.",
// 		price: 180,
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// 		locationValue: "AI",
// 		guestCount: 3,
// 		roomCount: 2,
// 		bathroomCount: 1,
// 	},
// 	{
// 		id: "7",
// 		title: "Chic Apartment near Shopping Center",
// 		description:
// 			"A stylish apartment located near the shopping center, with modern amenities.",
// 		price: 120,
// 		imageUrl:
// 			"https://plus.unsplash.com/premium_photo-1677561423213-f416ec0c3195?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// 		locationValue: "AI",
// 		guestCount: 3,
// 		roomCount: 1,
// 		bathroomCount: 1,
// 	},
// 	{
// 		id: "8",
// 		title: "Rustic Cabin by the Lake",
// 		description:
// 			"A rustic cabin overlooking the lake, perfect for nature lovers.",
// 		price: 250,
// 		imageUrl:
// 			"https://plus.unsplash.com/premium_photo-1692079868962-299ac7088306?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// 		locationValue: "AI",
// 		guestCount: 6,
// 		roomCount: 3,
// 		bathroomCount: 2,
// 	},
// 	{
// 		id: "8",
// 		title: "Rustic Cabin by the Lake",
// 		description:
// 			"A rustic cabin overlooking the lake, perfect for nature lovers.",
// 		price: 250,
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1486072889922-9aea1fc0a34d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// 		locationValue: "AI",
// 		guestCount: 6,
// 		roomCount: 3,
// 		bathroomCount: 2,
// 	},
// ];

// (async () => {
// 	const categories = await categoryService.findMany({});
// 	const users = await userService.findMany({});

// 	for (const item of listings) {
// 		const listingItem: CreateListingDto = {
// 			bathroomCount: item.bathroomCount,
// 			categoryIds: [
// 				...new Set([
// 					categories[
// 						Math.floor(Math.random() * categories.length)
// 					]._id.toString(),
// 					categories[
// 						Math.floor(Math.random() * categories.length)
// 					]._id.toString(),
// 					categories[
// 						Math.floor(Math.random() * categories.length)
// 					]._id.toString(),
// 					categories[
// 						Math.floor(Math.random() * categories.length)
// 					]._id.toString(),
// 					categories[
// 						Math.floor(Math.random() * categories.length)
// 					]._id.toString(),
// 					categories[
// 						Math.floor(Math.random() * categories.length)
// 					]._id.toString(),
// 				]),
// 			].map((item) => stringIdToObjectId(item)),
// 			description: item.description,
// 			guestCount: item.guestCount,
// 			hostId: users[Math.floor(Math.random() * users.length)]._id,
// 			images: [
// 				listings[Math.floor(Math.random() * listings.length)].imageUrl,
// 				listings[Math.floor(Math.random() * listings.length)].imageUrl,
// 			],
// 			locationValue: item.locationValue,
// 			price: item.price,
// 			publishDate: new Date(),
// 			roomCount: item.roomCount,
// 			status: ListingStatus.Active,
// 			title: item.title,
// 			thumbnail: item.imageUrl,
// 		};

// 		await listingService.create(listingItem);
// 		console.log("listing created");
// 	}
// })();

@Controller("categories")
export class CategoryController {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly userService: UserService,
		private readonly listingService: ListingService,
	) {}

	//  ----- Method: GET -----@
	@Public()
	@Get("/:id")
	async findOneById(
		@Param("id", ParseObjectIdPipe) id: Types.ObjectId,
		@GetAqp() { projection, populate }: PaginationDto,
	) {
		return this.categoryService.findById(id, { projection, populate });
	}

	@Public()
	@Get("/")
	async findMany(@GetAqp() { filter, ...options }: PaginationDto) {
		return this.categoryService.findMany(filter, options);
	}

	//  ----- Method: POST -----
	@Post("/")
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() body: CreateCategoryDto) {
		return this.categoryService.create(body);
	}

	//  ----- Method: PATCH -----
	@Patch("/:id")
	@HttpCode(HttpStatus.OK)
	async update(
		@Param("id", ParseObjectIdPipe) id: Types.ObjectId,
		@Body() body: UpdateCategoryDto,
	) {
		const updated = await this.categoryService.updateById(id, body);

		if (!updated) throw new NotFoundException("Category not found!");

		return updated;
	}

	//  ----- Method: DELETE -----
	@Delete("/:ids/ids")
	@HttpCode(HttpStatus.OK)
	async deleteManyByIds(@Param("ids") ids: string) {
		return this.categoryService.deleteMany({
			_id: { $in: ids.split(",").map((id) => stringIdToObjectId(id)) },
		});
	}

	@Delete("/:id")
	@HttpCode(HttpStatus.OK)
	async delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
		return this.categoryService.deleteById(id);
	}
}
