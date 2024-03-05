import Diary from "@models/diary";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, diary, tag } = await request.json();

    try {
        await connectToDB();
        const newDiary = new Diary({ creator: userId, diary, tag });

        await newDiary.save();
        return new Response(JSON.stringify(newDiary), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new diary", { status: 500 });
    }
}