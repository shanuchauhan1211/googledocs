import { Liveblocks } from "@liveblocks/node";
import { verifyToken } from "@/lib/jwtUtils";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Document from "@/models/Documents";

const liveblocks = new Liveblocks({
  secret:
  process.env.LIVEBLOCK_SECRET_KEY as string,
});

function getRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("jwt");

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 },
    );
  }

  let userId;
  try {
    const decodedToken = verifyToken(token.value);
    userId = decodedToken?._id;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 },
      );
    }
  } catch (err) {
    return NextResponse.json({ message: `${err}` }, { status: 401 });
  }

  try {
    const { room } = await req.json();
    if (!room) {
      return NextResponse.json(
        { message: "Room ID is required" },
        { status: 400 },
      );
    }
    const user = await User.findById({ _id: userId });
    if (!user) {
      return NextResponse.json({ message: "User not Found" }, { status: 404 });
    }
    const doc = await Document.findById({ _id: room });

    if (!doc) {
      return NextResponse.json(
        { message: "Document not Found" },
        { status: 404 },
      );
    }

    const isOwner = doc.ownerId === userId;

    const isContributor = doc.collaboratorIds.includes(userId);
    console.log(isContributor);

    if (!isOwner && !isContributor) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userInfo = { name: user.name, color: getRandomColor() };

    const session = liveblocks.prepareSession(userId as string, { userInfo });
    session.allow(room, session.FULL_ACCESS);

    const { body, status } = await session.authorize();
    const parsedBody = JSON.parse(body);
    return NextResponse.json({ token: parsedBody.token }, { status });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
