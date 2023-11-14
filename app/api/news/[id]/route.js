import { NextResponse } from "next/server";
import News from "@/models/News";
import db from "@/utils/getConnection";

export const DELETE = async (request, { params }) => {
	try {
		db.connect();
		const { id } = params;
		const deletedNews = await News.findOneAndDelete({ _id: id });
		if (!deletedNews) {
			return NextResponse.json("Noticia no encontrada.", { status: 404 });
		}
		return NextResponse.json(deletedNews, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 400 });
	}
};
