import { getDb } from "@/db";
import { todos } from "@/db/schema";

export async function GET(request: Request) {
    const db = await getDb();
    try {
        const todo = await db.select().from(todos);
        console.log('Getting all todo from the database: ', todo)
        return Response.json({
            success: true,
            message: "Successfully get all todos",
            data: todo
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: "Error in getting todos",
        }, { status: 500 })
    }
}