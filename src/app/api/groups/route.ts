import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, subject, year, semester, section } = body;

    if (!name || !subject || !year || !semester || !section) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Check if user exists in our database
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If user doesn't exist, create them (they should be created by webhook, but just in case)
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: "", // This will be updated by webhook
          name: "",
        },
      });
    }

    const group = await prisma.group.create({
      data: {
        name,
        subject,
        year: Number(year),
        semester,
        section,
        users: {
          connect: { id: userId },
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error("Create group error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const group = await prisma.group.findUnique({
        where: { id: parseInt(id) },
        include: {
          users: {
            select: { name: true, email: true },
          },
        },
      });

      if (!group) {
        return NextResponse.json(
          { message: "Group not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(group);
    }

    const groups = await prisma.group.findMany({
      include: {
        users: {
          select: { name: true },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(groups);
  } catch (error) {
    console.error("Fetch groups error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
