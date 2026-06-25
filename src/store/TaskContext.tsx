import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode
} from "react";
import { Task } from "../types";
import { taskReducer, initialState, TaskState } from "./taskReducer";
import { loadTasks, saveTasks } from "../services/storage";

interface TaskContextValue extends TaskState {
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    loadTasks().then(tasks => {
      dispatch({ type: "LOAD_TASKS", payload: tasks });
    });
  }, []);

  useEffect(() => {
    if (state.loaded) {
      saveTasks(state.tasks);
    }
  }, [state.tasks, state.loaded]);

  const addTask = useCallback((task: Task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  }, []);

  const updateTask = useCallback((task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
  }, []);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  const toggleStatus = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_STATUS", payload: id });
  }, []);

  return (
    <TaskContext.Provider
      value={{ ...state, addTask, updateTask, deleteTask, toggleStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used within TaskProvider");
  return ctx;
}
