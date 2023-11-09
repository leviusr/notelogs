import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { useState } from "react";

export async function GET() {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const create = await prisma.note.create({
      data: {
        title,
        content,
      },
    });
    console.log(create);
    return NextResponse.json(create);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }
  }
}


