import Diary from "@models/diary";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const diaries = await Diary.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(diaries), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all diaries", { status: 500 });
  }
};
