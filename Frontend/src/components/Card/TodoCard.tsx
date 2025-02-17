import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../redux/todo/todoSlice';
import { AppDispatch } from '../../app/store';
import { ring } from 'ldrs';
import { axiosInstance } from '../../axios/axios';

// type Task = {
//     id: string;
//     content: string;
// };

type Todo = {
    _id: string;
    title?: string;
    description: string;
    status: string;
    user: string;
}

type TaskState = {
    [key: string]: Todo[];
};

const initialData: TaskState = {
    pending: [],
    inProgress: [],
    completed: [],
};

function TodoCard() {
    console.log('TodoCard component re-rendered');
    ring.register()
    const [tasks, setTasks] = useState<TaskState>(initialData);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    const { todos, loading, error } = useSelector((state: any) => state.todo);

    if (todos.data) {
        const allTodos: [] = todos.data
        tasks.pending = []
        tasks.inProgress = []
        tasks.completed = []

        allTodos.map((todo: Todo) => {
            if (todo.status == "pending") {
                tasks.pending.push(todo)
            } else if (todo.status == "inProgress") {
                tasks.inProgress.push(todo)
            } else {
                tasks.completed.push(todo)
            }
        })
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        console.log("source ", source);

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
        console.log("start ", start);
        console.log("finish ", finish);

        if (start === finish) {
            const newTaskIds = Array.from(start);
            console.log("newTaskIds ", newTaskIds);
            const [movedTask] = newTaskIds.splice(source.index, 1);
            console.log("movedTask ", movedTask);
            newTaskIds.splice(destination.index, 0, movedTask);

            const newState = {
                ...tasks,
                [source.droppableId]: newTaskIds,
            };
            console.log("newState ", newState);

            setTasks(newState);
            console.log("tasks ", tasks);
            // Update the task order on the backend
            const todoId = movedTask._id;
            const order = destination.index;
            const todoIds = newTaskIds.map((task) => task._id);
            console.log("ids ", todoIds);
            axiosInstance.patch(`/api/v1/todo/update`, { todoId, order, todoIds })
                .then((response) => {
                    console.log(response.data);
                    dispatch(getTodos());
                })
                .catch((error) => {
                    console.error(error);
                });
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

        // Update the task status and order on the backend
        const todoId = movedTask._id;
        const status = destination.droppableId;
        const order = destination.index;
        const todoIds = finishTaskIds.map((task) => task._id);
        axiosInstance.patch(`/api/v1/todo/update`, { todoId, status, order, todoIds })
            .then((response) => {
                console.log(response.data);
                dispatch(getTodos());
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col sm:flex-row w-full gap-x-4 gap-y-4 p-4 text-black">
                <>
                    {error && <p className="text-red-500">{error}</p>}
                    {loading &&
                        <div className='text-center h-full w-full absolute flex justify-center items-center backdrop-blur-[2px] bottom-1 z-50'>
                            <l-ring
                                size="40"
                                stroke="5"
                                bg-opacity="0"
                                speed="2"
                                color="black"
                            ></l-ring>
                        </div>
                    }
                    {['pending', 'inProgress', 'completed'].map((status) => (
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="sm:w-1/3 bg-transparent backdrop-blur-xl p-4 !z-10 rounded-md"
                                >
                                    <h2 className="font-bold text-lg mb-4">
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </h2>
                                    {tasks && tasks[status].map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        left: "auto !important",
                                                        top: "auto !important",
                                                    }}
                                                    className="bg-white p-2 mb-2 rounded-md shadow-md !z-50">
                                                    {task.description}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </>
            </div>
        </DragDropContext>
    );
}

export default TodoCard;
