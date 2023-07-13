import React from 'react';
import { ITask } from '../../../types/task';
import Task from './Task';

interface TodoListProps {
    task: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ task }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {task.map(tasks => (
                        <Task key={tasks.id} tasks={tasks} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList;