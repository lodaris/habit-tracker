export interface Habit {
  id: number;
  name: string;
  description: string;
  category: string;
  createdAt: string;
}

export interface HabitLog {
  id: number;
  habitId: number;
  date: string;
  completed: boolean;
  note: string;
}