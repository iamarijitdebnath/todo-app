import { useState } from "react";
import TodoCard from "./TodoCard";
import DeleteModal from "./DeleteModal";
import { Todo } from "@/types";

interface TodoListProps {
    todos: Todo[];
    onEdit: (todo: Todo) => void;
    onDelete: (id: string) => void;
}

const TodoList = ({ todos, onEdit, onDelete }: TodoListProps) => {
    const [deleteConfirm, setDeleteConfirm] = useState<{
        isOpen: boolean;
        todo: Todo | null;
    }>({
        isOpen: false,
        todo: null,
    });

    const handleDelete = (todo: Todo) => {
        setDeleteConfirm({
            isOpen: true,
            todo,
        });
    };

    const confirmDelete = () => {
        if (deleteConfirm.todo) {
            onDelete(deleteConfirm.todo.id);
        }
        setDeleteConfirm({
            isOpen: false,
            todo: null,
        });
    };

    const closeModal = () => {
        setDeleteConfirm({
            isOpen: false,
            todo: null,
        });
    };

    if (todos.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-lg text-muted-foreground">No todos yet. Create your first one!</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {todos.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        onEdit={onEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {deleteConfirm.todo && (
                <DeleteModal
                    isOpen={deleteConfirm.isOpen}
                    onClose={closeModal}
                    onDelete={confirmDelete}
                    title={deleteConfirm.todo.title}
                />
            )}
        </>
    );
};

export default TodoList;