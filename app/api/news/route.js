import { NextResponse } from "next/server";
import News from "@/models/News";
import db from "@/utils/getConnection";

export const GET = async () => {
	try {
		db.connect();
		const news = await News.find();
		return NextResponse.json(news, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};

export async function POST(request) {
	try {
		db.connect();
		const body = await request.json();
		const newNews = new News(body);
		const savedNews = await newNews.save();
		return NextResponse.json(savedNews);
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}

export async function DELETE(request) {
	try {
	  db.connect();
	  const title = request.json(); 
	  const deletedNew = await News.findOneAndRemove(title);
	  if (!deletedNew) {
		return NextResponse.json("Noticia no encontrada", { status: 404 });
	  }
  
	  return NextResponse.json(deletedNew, { status: 200 });
	} catch (error) {
	  return NextResponse.json(error.message, { status: 500 });
	}
  }
