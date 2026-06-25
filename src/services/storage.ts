import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types";

const TASKS_KEY = "@taskmanager_tasks";

export async function loadTasks(): Promise<Task[]> {
  try {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {
    // fail silently, tasks live in memory regardless
  }
}
