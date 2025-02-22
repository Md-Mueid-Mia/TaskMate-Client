
import { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskContext } from "../Context/TaskContext";
import TaskModal from "./TaskModal";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useTheme } from "../Context/ThemeContext";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const { tasks, updateTask, addTask, deleteTask } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDarkTheme] = useTheme();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const task = tasks.find((t) => t._id === result.draggableId);
    if (task.category !== categories[result.destination.droppableId]) {
      updateTask({
        id: task._id,
        updatedTask: {
          ...task,
          category: categories[result.destination.droppableId],
        },
      });
    }
  };

  const handleAddTask = (newTask) => {
    addTask(newTask);
  };

  const handleEditTask = async(task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          await deleteTask(taskId);
          Swal.fire({
            title: "Deleted!",
            text: "Task deleted successfully.",
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkTheme ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-slate-100'
    } py-8 px-4 transition-colors duration-200`}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-4 max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className={`text-4xl font-bold ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            } mb-2 transition-colors duration-200`}>
              Task Management Board
            </h1>
            <p className={`${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            } transition-colors duration-200`}>
              Organize and track your tasks efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Droppable key={category} droppableId={`${index}`}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${
                      isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
                    } rounded-lg shadow-sm p-4 transition-colors duration-200`}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          category === "To-Do" ? "bg-blue-500" :
                          category === "In Progress" ? "bg-amber-500" :
                          "bg-green-500"
                        }`} />
                        <h2 className={`font-bold text-xl ${
                          isDarkTheme ? 'text-white' : 'text-gray-800'
                        } transition-colors duration-200`}>
                          {category}
                        </h2>
                        <span className={`text-sm px-2 py-0.5 ${
                          isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        } rounded-full transition-colors duration-200`}>
                          {tasks.filter(task => task.category === category).length}
                        </span>
                      </div>
                      {category === "To-Do" && (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className={`p-2 ${
                            isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'
                          } rounded-xl transition-all duration-200 group`}
                        >
                          <PlusIcon className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      {tasks
                        .filter((task) => task.category === category)
                        .map((task, idx) => (
                          <Draggable key={task._id} draggableId={task._id} index={idx}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`group ${
                                  isDarkTheme 
                                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400' 
                                    : 'bg-white border-gray-100 hover:border-blue-200'
                                } p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border hover:scale-[1.02]`}
                              >
                                <div className="space-y-3">
                                  <h3 className={`font-semibold ${
                                    isDarkTheme ? 'text-white' : 'text-gray-800'
                                  } pr-8 transition-colors duration-200`}>
                                    Title: {task.title}
                                  </h3>
                                  {task.description && (
                                    <p className={`text-sm ${
                                      isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                                    } line-clamp-2 transition-colors duration-200`}>
                                      Description: {task.description}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-3">
                                  <div className={`w-2.5 h-2.5 rounded-full ${
                          category === "To-Do" ? "bg-blue-500" :
                          category === "In Progress" ? "bg-amber-500" :
                          "bg-green-500"
                        }`} />
                                  {task.category && (
                                    <p className={`text-sm ${
                                      isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                                    } line-clamp-2 transition-colors duration-200`}>
                                     Type: {task.category}
                                    </p>
                                  )}
                                  </div>
                                  <div className={`flex items-center justify-between pt-3 border-t ${
                                    isDarkTheme ? 'border-gray-600' : 'border-gray-100'
                                  }`}>
                                    <div className={`flex items-center text-xs ${
                                      isDarkTheme ? 'text-gray-400 bg-gray-600' : 'text-gray-500 bg-gray-50'
                                    } px-2 py-1 rounded-md transition-colors duration-200`}>
                                      <ClockIcon className="w-3.5 h-3.5 mr-1" />
                                      {new Date(task?.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                      <button
                                        onClick={() => handleEditTask(task)}
                                        className={`p-1.5 ${
                                          isDarkTheme 
                                            ? 'text-blue-400 hover:bg-gray-600' 
                                            : 'text-blue-600 hover:bg-blue-50'
                                        } rounded-lg transition-colors`}
                                        title="Edit task"
                                      >
                                        <PencilIcon className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className={`p-1.5 ${
                                          isDarkTheme 
                                            ? 'text-red-400 hover:bg-gray-600' 
                                            : 'text-red-600 hover:bg-red-50'
                                        } rounded-lg transition-colors`}
                                        title="Delete task"
                                      >
                                        <TrashIcon className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>
      <TaskModal
        isOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={(taskData) => {
          if (editingTask) {
            updateTask({
              id: editingTask._id,
              updatedTask: taskData,
            });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Task edited successfully",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            addTask(taskData);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Task Added successfully",
              showConfirmButton: false,
              timer: 1500
            });
          }
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        initialData={editingTask} 
      />
    </div>
  );
};

export default TaskBoard;