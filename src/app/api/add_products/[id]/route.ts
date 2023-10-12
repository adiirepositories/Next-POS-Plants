// import bcrypt from 'bcrypt'
// import prisma from '../../libs/prismadb'
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
// import { toast } from "react-hot-toast"
import { PrismaClient } from "@prisma/client";
import { Product } from "../../../types";

const prisma = new PrismaClient();


export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  try {
    const id = params
    const res = await prisma.products.findMany({
      where : id
    });
    return NextResponse.json(res);
    
  } catch (err) {
    return NextResponse.json(
      { message: "error while fetching products", err },
      { status: 404 }
    );
  }
}
