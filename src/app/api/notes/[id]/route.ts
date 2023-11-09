import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

interface Params {
  params: {
    id: string
  }
}

{/*Obtenos datos*/}
export async function GET (request: Request, {params}:Params){
  try {
  console.log(params.id)
  const valor = await prisma.note.findFirst({
    where: {
      id:Number(params.id),
    }
  });
    if (!valor){
      return NextResponse.json(
        {message: "Not Found!"},
        {status: 404}
      )
    }
  return NextResponse.json(valor)
  }catch(error){
    if (error instanceof Error){
    return NextResponse.json({
      message: error.message},{
        status:500
      } )
    }
  }
}

{/*Borramos datos*/}
export async function DELETE (request: Request, {params}: Params) {
  try {
    console.log(params)
 const valor = await prisma.note.delete({
    where:{
     id:Number(params.id)
    }
  })
    if(!valor) return NextResponse.json(`ID NOT FOUNT`)
  return NextResponse.json(valor)
  }catch(error){
    if (error instanceof Error){
    return NextResponse.json(
      {message:`${params.id} ID NOT FOUNT`},
      {status: 404})
    }
  }
}

{/*Modificamos datos*/}
export async function PUT (request:Request, {params}:Params) {
console.log(params)
try {
const {title, content} = await request.json();
const valor = await prisma.note.update({
  where:{
  id:Number(params.id)
},
    data:{
      title,
      content
    }
})
    return NextResponse.json(valor)
}catch(error){
  if (error instanceof Prisma.PrismaClientKnownRequestError){
    if (error.code === 'P2025'){
        return NextResponse.json(
          {message:`ID:${params.id} <----- NOT FOUND`},
          {status: 404}
        )
      } 
  return NextResponse.json(
  {message: error.message},
  {status: 404}
   )
  }
    }
 }

