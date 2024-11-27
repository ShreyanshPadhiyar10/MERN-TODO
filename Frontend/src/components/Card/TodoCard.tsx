import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

type Task = {
    id: string;
    content: string;
};

type TaskState = {
    [key: string]: Task[];
};

const initialData: TaskState = {
    pending: [
        { id: '1', content: 'Task 1' },
        { id: '2', content: 'Task 2' },
    ],
    inProgress: [
        { id: '3', content: 'Task 3' },
    ],
    completed: [
        { id: '4', content: 'Task 4' },
    ],
};

function TodoCard() {
    const [tasks, setTasks] = useState<TaskState>(initialData);

    console.log(tasks);
    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        // Dropped outside a droppable area
        if (!destination) {
            return;
        }

        // Dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Moving within the same droppable area
        const start = tasks[source.droppableId];
        const finish = tasks[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start);
            const [movedTask] = newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, movedTask);

            const newState = {
                ...tasks,
                [source.droppableId]: newTaskIds,
            };

            setTasks(newState);
            return;
        }

        // Moving to a different droppable area
        const startTaskIds = Array.from(start);
        const [movedTask] = startTaskIds.splice(source.index, 1);
        const finishTaskIds = Array.from(finish);
        finishTaskIds.splice(destination.index, 0, movedTask);

        const newState = {
            ...tasks,
            [source.droppableId]: startTaskIds,
            [destination.droppableId]: finishTaskIds,
        };

        setTasks(newState);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex space-x-4 p-4 text-black">
                {['pending', 'inProgress', 'completed'].map((status, index) => (
                    <Droppable droppableId={status} key={index}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="w-1/3 bg-transparent backdrop-blur-xl p-4 rounded-md"
                            >
                                <h2 className="font-bold text-lg mb-4">
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </h2>
                                {tasks[status].map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (  
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white p-2 mb-2 rounded-md shadow-md"
                                            >
                                                {task.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}

export default TodoCard;
