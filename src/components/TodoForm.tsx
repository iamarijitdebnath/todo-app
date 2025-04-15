import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { PlusCircle, CheckCircle } from "lucide-react";
import { Todo } from "@/types";
import { v4 as uuidv4 } from 'uuid';

interface TodoFormProps {
    onSubmit: (todo: Todo) => void;
    editingTodo: Todo | null;
    setEditingTodo: (todo: Todo | null) => void;
}

const TodoForm = ({ onSubmit, editingTodo, setEditingTodo }: TodoFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"start" | "progress" | "completed">("start");

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description);
            setStatus(editingTodo.status);
        }
    }, [editingTodo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        const todoData: Todo = editingTodo
            ? { ...editingTodo, title, description, status }
            : {
                id: uuidv4(),
                title,
                description,
                status,
                createdAt: new Date()
            };

        onSubmit(todoData);
        resetForm();
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStatus("start");
        setEditingTodo(null);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl">
                    {editingTodo ? "Edit Todo" : "Create New Todo"}
                </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter todo title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter todo description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={status}
                            onValueChange={(value) => setStatus(value as "start" | "progress" | "completed")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="start">Start</SelectItem>
                                    <SelectItem value="progress">Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    {editingTodo && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={resetForm}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className={`${editingTodo ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    >
                        {editingTodo ? (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Update Todo
                            </>
                        ) : (
                            <>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Todo
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default TodoForm;