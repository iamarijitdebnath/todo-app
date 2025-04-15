import { getDb } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: Request) {
    const db = await getDb();
    try {
        const { id } = await request.json();

        await db.delete(todos).where(eq(todos.id, id));

        console.log(`Todo with ID ${id} deleted.`);
        return Response.json({
            success: true,
            message: "Todo deleted successfully"
        });
    } catch (error) {
        console.log("Error deleting todo", error);
        return Response.json({
            success: false,
            message: "Problem deleting todo"
        }, { status: 500 });
    }
}
