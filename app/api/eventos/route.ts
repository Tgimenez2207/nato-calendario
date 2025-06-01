import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const eventos = await prisma.evento.findMany();
  return NextResponse.json(eventos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const nuevo = await prisma.evento.create({
    data: {
      ...body,
      fecha_inicio: new Date(body.fecha_inicio),
      fecha_fin: new Date(body.fecha_fin),
    },
  });
  return NextResponse.json(nuevo);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const actualizado = await prisma.evento.update({
    where: { id: body.id },
    data: {
      ...body,
      fecha_inicio: new Date(body.fecha_inicio),
      fecha_fin: new Date(body.fecha_fin),
    },
  });
  return NextResponse.json(actualizado);
}

export async function DELETE(req: Request) {
  const body = await req.json();
  await prisma.evento.delete({ where: { id: body.id } });
  return NextResponse.json({ ok: true });
}