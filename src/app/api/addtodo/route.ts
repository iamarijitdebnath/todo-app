import { getDb } from "@/db";
import { todos } from "@/db/schema";

export async function POST(request: Request) {
    const db = await getDb()
    try {
        const { title, description } = await request.json();
        const todo: typeof todos.$inferInsert = { title, description };
        await db.insert(todos).values(todo);
        console.log('New todo created!')
        return Response.json({
            success: true,
            message: "Todo created successfully",
            data: todo
        })
    } catch (error) {
        console.log("Error in creating todos", error);
        return Response.json({
            success: false,
            message: "Problem in creating todos",
        })
    }
}