import { NextResponse } from "next/server";
import Performance from "@/models/Performance";
import Category from "@/models/Category";
import Discipline from "@/models/Discipline";
import User from "@/models/User";
import db from "@/utils/getConnection";

export async function POST(request) {
	try {
		const body = await request.json();
		const newPerformance = new Performance(body);
		db.connect();
		const savedPerformance = await newPerformance.save();
		return NextResponse.json(savedPerformance);
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}

export async function GET() {
	try {
		db.connect();
		const performances = await Performance.find({})
			.populate('category')
			.populate('discipline')
			.populate('athleteId');
		return NextResponse.json(performances);
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 500,
		});
	}
}

export async function PUT(request) {
	try {
	  const { category, discipline, athleteId, record, unit } = await request.json();
	  
	  db.connect();
	  const performance = await Performance.findOne({ athleteId, category, discipline });
  
	  if (!performance) {
		return NextResponse.json('Rendimiento no encontrado', {
		  status: 404,
		});
	  }
  
	  performance.record = record;
	  performance.unit = unit;
	  const updatedPerformance = await performance.save();
	  return NextResponse.json(updatedPerformance);
	} catch (error) {
	  return NextResponse.json(error.message, {
		status: 400,
	  });
	}
  }
