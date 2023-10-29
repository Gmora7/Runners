import { NextResponse } from "next/server";
import Category from "@/models/Category";
import db from "@/utils/getConnection";

export const GET = async () => {
	try {
		db.connect();
		const categories = await Category.find();
		return NextResponse.json(categories, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};
