import { getDb } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
const db = await getDb();
export async function GET(request: Request) {
    // const db = await getDb();
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


export async function POST(request: Request) {
    // const db = await getDb();
    try {
        const { title, description, status } = await request.json();

        if (!title || !description || !status) {
            return Response.json({
                success: false,
                message: "Missing required fields",
            }, { status: 400 });
        }

        const newTodo: typeof todos.$inferInsert = {
            title,
            description,
            status,
            createdAt: new Date(),
        };

        await db.insert(todos).values(newTodo);

        return Response.json({
            success: true,
            message: "Todo created successfully",
            data: newTodo,
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating todo:", error);
        return Response.json({
            success: false,
            message: "Internal Server Error",
        }, { status: 500 });
    }
}


export async function PATCH(request: Request) {
    const db = await getDb();

    try {
        const { id, title, description, status } = await request.json();

        if (!id || !title || !description || !status) {
            return Response.json({
                success: false,
                message: "Missing fields in request body"
            }, { status: 400 });
        }

        const updated = await db.update(todos)
            .set({ title, description, status })
            .where(eq(todos.id, id))
            .returning();

        if (updated.length === 0) {
            return Response.json({
                success: false,
                message: "Todo not found",
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Todo updated successfully",
            data: updated[0],
        });

    } catch (error) {
        console.error("Error updating todo:", error);
        return Response.json({
            success: false,
            message: "Failed to update todo",
        }, { status: 500 });
    }
}


export async function DELETE(request: Request) {
    // const db = await getDb();
    try {
        const { id } = await request.json();

        if (!id) {
            return Response.json({
                success: false,
                message: "Missing todo id in request body",
            }, { status: 400 });
        }

        const deleted = await db.delete(todos)
            .where(eq(todos.id, id))
            .returning();

        if (deleted.length === 0) {
            return Response.json({
                success: false,
                message: "Todo not found",
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Todo deleted successfully",
            data: deleted[0],
        });

    } catch (error) {
        console.error("Error deleting todo:", error);
        return Response.json({
            success: false,
            message: "Failed to delete todo",
        }, { status: 500 });
    }
}