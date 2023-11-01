// import bcrypt from 'bcrypt'
// import prisma from '../../libs/prismadb'
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
// import { toast } from "react-hot-toast"
import { PrismaClient } from "@prisma/client";
import { Product } from "../../types";

const prisma = new PrismaClient();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body: Product = await request.json();

    const { productName, description, price, urlImage } = body;
    const products = await prisma.products.create({
      data: {
        productName,
        description,
        urlImage,
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



export async function GET(request: NextRequest, response: NextResponse) {

  // const { query: { key } } = request;

  // if (key === 'secretkey') {
  //   NextResponse.json({
  //     message: "Please enter title"
  //   }, {
  //     status: 400,
  //   })  } else {
  //     NextResponse.json({
  //       message: "Unauthorized. Invalid key provided."
  //     }, {
  //       status: 400,
  //     })
  // }

  
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

