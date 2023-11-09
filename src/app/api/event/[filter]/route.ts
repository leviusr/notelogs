import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

interface Params {
  filter: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    console.log(params.filter);
    const valor = await prisma?.note.findMany({
      where: {
        title: {
          contains:(params.filter)
        }
      },
    });
    if (!valor) {
      return NextResponse.json({ message: "Not Found!" }, { status: 404 });
    }
    return NextResponse.json(valor);
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
//
// export async function OPTIONS(
//   request: Request,
//   { params }: { params: Params },
// ) {
//   console.log(params.filter);
//   const { title } = await request.json();
//   const getPosts = await prisma?.note.findMany({
//     where: {
//       title: {
//         contains: params.filter,
//       },
//     },
//   });
//   console.log(getPosts);
//   return NextResponse.json(getPosts);
// }
// export async function OPTIONS(request: Request, {params}:{params:Params} ) {
//   console.log(params.filter)
//   try {
//     const { title } = await request.json();
//     const find = await prisma.note.findMany({
//       where: {
//         title:{
//           contains: (params.filter)
//         },
//       },
//     });
//     console.log(find)
//     const data = NextResponse.json(find)
//     return data
//   } catch {}
// }
