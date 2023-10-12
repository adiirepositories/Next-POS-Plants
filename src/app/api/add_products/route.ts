// import bcrypt from 'bcrypt'
// import prisma from '../../libs/prismadb'
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
// import { toast } from "react-hot-toast"
import { PrismaClient } from "@prisma/client";
import { Product } from "../../types";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: Product = await request.json();

    const { productName, description, price } = body;
    const products = await prisma.products.create({
      data: {
        productName,
        description,
        price,
      },
    });

    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json(
      { message: "error while post products", err },
      { status: 500 }
    );
  }
}



export async function GET(request: NextRequest) {
  try {

    const res = await prisma.products.findMany();
    return NextResponse.json(res);
    
  } catch (err) {
    return NextResponse.json(
      { message: "error while fetching products", err },
      { status: 500 }
    );
  }
}
