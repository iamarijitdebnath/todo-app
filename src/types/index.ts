export interface Todo {
    id: string;
    title: string;
    description: string;
    status: 'start' | 'progress' | 'completed';
    createdAt: Date;
}