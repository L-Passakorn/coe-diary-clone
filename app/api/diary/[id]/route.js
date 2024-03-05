import Diary from "@models/diary";
import { connectToDB } from "@utils/database";

// GET Method
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const diary = await Diary.findById(params.id).populate("creator");
    if (!diary) return new Response("Diary Not Found", { status: 404 });

    return new Response(JSON.stringify(diary), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

// PATCH Method
export const PATCH = async (request, { params }) => {
  const { diary, tag } = await request.json();

  try {
    await connectToDB();
    const existingDiary = await Diary.findById(params.id);
    if (!existingDiary) return new Response("Diary Not Found", { status: 404 });

    existingDiary.diary = diary;
    existingDiary.tag = tag;

    await existingDiary.save();

    return new Response(JSON.stringify(existingDiary), { status: 200 });
  } catch (error) {
    return new Response("Failed to update diary", { status: 500 });
  }
};

// DELETE Method
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Diary.findByIdAndDelete(params.id);

    return new Response("Diary deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete diary", { status: 500 });
  }
};
