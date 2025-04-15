'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types";
import { ListChecks, Check, TimerIcon, Circle } from "lucide-react";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  //  Get all todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("/api/todos");
      setTodos(res.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create or update todo
  const handleAddTodo = async (todo: Todo) => {
    try {
      if (editingTodo) {
        await axios.patch("/api/todos", todo);
      } else {
        await axios.post("/api/todos", todo);
      }
      fetchTodos();
      setEditingTodo(null);
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  //  Edit todo
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //  Delete todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete("/api/todos", { data: { id } });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const filteredTodos =
    activeFilter === "all"
      ? todos
      : todos.filter((todo) => todo.status === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">
            My Todos
          </h1>
          <p className="text-gray-500">Manage your tasks efficiently</p>
        </div>

        <div className="grid gap-8">
          {/* Todo Form Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <TodoForm
              onSubmit={handleAddTodo}
              editingTodo={editingTodo}
              setEditingTodo={setEditingTodo}
            />
          </div>

          {/* Todo List Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ListChecks className="mr-2 h-5 w-5" />
                Your Tasks
              </h2>

              <Tabs
                value={activeFilter}
                onValueChange={setActiveFilter}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
                  <TabsTrigger value="all" className="flex gap-2 items-center">
                    <ListChecks className="h-4 w-4" />
                    All ({todos.length})
                  </TabsTrigger>
                  <TabsTrigger value="start" className="flex gap-2 items-center">
                    <Circle className="h-4 w-4 text-blue-500" />
                    Start ({todos.filter(t => t.status === "start").length})
                  </TabsTrigger>
                  <TabsTrigger value="progress" className="flex gap-2 items-center">
                    <TimerIcon className="h-4 w-4 text-amber-500" />
                    Progress ({todos.filter(t => t.status === "progress").length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex gap-2 items-center">
                    <Check className="h-4 w-4 text-green-500" />
                    Completed ({todos.filter(t => t.status === "completed").length})
                  </TabsTrigger>
                </TabsList>

                <Separator className="my-4" />

                {["all", "start", "progress", "completed"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-0">
                    <TodoList
                      todos={filteredTodos}
                      onEdit={handleEditTodo}
                      onDelete={handleDeleteTodo}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
