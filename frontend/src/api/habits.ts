import axios from 'axios';
import type { Habit, HabitLog } from '../types';

const API = 'http://localhost:3000';

// Habits
export const getHabits = () =>
  axios.get<Habit[]>(`${API}/habits`).then(r => r.data);

export const getHabit = (id: number) =>
  axios.get<Habit>(`${API}/habits/${id}`).then(r => r.data);

export const createHabit = (data: { name: string; description?: string; category?: string }) =>
  axios.post<Habit>(`${API}/habits`, data).then(r => r.data);

export const deleteHabit = (id: number) =>
  axios.delete(`${API}/habits/${id}`).then(r => r.data);

// HabitLogs
export const getLogsByHabit = (habitId: number) =>
  axios.get<HabitLog[]>(`${API}/habit-logs/habit/${habitId}`).then(r => r.data);

export const createLog = (data: Omit<HabitLog, 'id'>) =>
  axios.post<HabitLog>(`${API}/habit-logs`, data).then(r => r.data);

export const deleteLog = (id: number) =>
  axios.delete(`${API}/habit-logs/${id}`).then(r => r.data);