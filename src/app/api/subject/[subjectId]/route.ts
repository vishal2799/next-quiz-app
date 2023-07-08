import { NextResponse } from "next/server";
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubjectValidator } from "@/lib/validators/subject";

export async function GET(
  req: Request,
  { params }: { params: { subjectId: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session?.user && session?.user?.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 })
    }

    if (!params.subjectId) {
      return new NextResponse("Subject id is required", { status: 400 });
    }

    const category = await db.subject.findUnique({
      where: {
        id: params.subjectId
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    console.log('[SUBJECT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { subjectId: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session?.user && session?.user?.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 })
    }

    if (!params.subjectId) {
      return new NextResponse("Subject id is required", { status: 400 });
    }


    const subject = await db.subject.delete({
      where: {
        id: params.subjectId,
      }
    });
  
    return NextResponse.json(subject);
  } catch (error) {
    console.log('[SUBJECT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { subjectId: string} }
) {
  try {   
    const session = await getAuthSession()

    if (!session?.user && session?.user?.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json();
    
    const { name } = SubjectValidator.parse(body);  

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.subjectId) {
      return new NextResponse("Subject id is required", { status: 400 });
    }


    const subject = await db.subject.update({
      where: {
        id: params.subjectId,
      },
      data: {
        name
      }
    });
  
    return NextResponse.json(subject);
  } catch (error) {
    console.log('[SUBJECT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};