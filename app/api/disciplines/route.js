import { NextResponse } from "next/server";
import Discipline from "@/models/Discipline";
import db from "@/utils/getConnection";
import Category from "@/models/Category";

export async function POST(request) {
	try {
		const body = await request.json();
		const { categories } = body;
		db.connect();
		//FIXME: No se está validando que las categorías existan
		const categoryIds = await Promise.all(
			categories.map(async (category) => {
				const foundCategory = await Category.findOne({
					name: category,
				});
				return foundCategory ? foundCategory._id : null;
			})
		);
		const newDiscipline = new Discipline({
			...body,
			categories: categoryIds.filter((categoryId) => categoryId !== null),
		});
		await newDiscipline.save();
		return NextResponse.json({ status: 201 });
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}

export async function GET() {
	try {
		db.connect();
		const disciplines = await Discipline.find()
			.populate("categories")
			.lean(); // Obtener todas las competencias y poblar la categoría
		const disciplinesWithCategories = disciplines.map((discipline) => {
			return {
				...discipline,
				categories: discipline.categories.map(
					(category) => category.name
				),
			};
		});
		return NextResponse.json(disciplinesWithCategories, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 500,
		});
	}
}
