import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Received body:", body); // Debug log

    const { name, subject, year, semester, section } = body;

    // Validate required fields
    if (!name || !subject || !year || !semester || !section) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate year is a number
    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1 || yearNum > 4) {
      return NextResponse.json(
        { error: "Year must be between 1 and 4" },
        { status: 400 },
      );
    }

    // Check if user exists in our database
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      // Create user if they don't exist
      user = await prisma.user.create({
        data: {
          id: userId,
          email: "temp@email.com", // This will be updated by webhook
          name: "User",
        },
      });
    }

    // Create the group and connect the user
    const group = await prisma.group.create({
      data: {
        name,
        subject,
        year: yearNum,
        semester,
        section,
        users: {
          connect: { id: userId },
        },
      },
      include: {
        users: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    console.error("Create group error:", error);
    return NextResponse.json(
      {
        error:
          "Internal server error: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
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
            select: { id: true, name: true, email: true },
          },
        },
      });

      if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
      }

      return NextResponse.json(group);
    }

    // Return all groups
    const groups = await prisma.group.findMany({
      include: {
        users: {
          select: { id: true, name: true },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: { createdAt: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(groups);
  } catch (error) {
    console.error("Fetch groups error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
