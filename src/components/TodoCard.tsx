import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Todo } from "@/types";
import { format } from "date-fns";

interface TodoCardProps {
    todo: Todo;
    onEdit: (todo: Todo) => void;
    onDelete: (todo: Todo) => void;
}

const TodoCard = ({ todo, onEdit, onDelete }: TodoCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800 hover:bg-green-100/80";
            case "progress":
                return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
            case "start":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
        }
    };

    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-lg font-medium leading-none">{todo.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {format(new Date(todo.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                </div>
                <Badge className={`${getStatusColor(todo.status)} capitalize`}>
                    {todo.status}
                </Badge>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <p className="text-sm text-gray-600">{todo.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-gray-600"
                    onClick={() => onEdit(todo)}
                >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-red-600 hover:text-red-700 hover:border-red-200"
                    onClick={() => onDelete(todo)}
                >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TodoCard;