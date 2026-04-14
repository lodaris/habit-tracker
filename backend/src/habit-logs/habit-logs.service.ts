import { Injectable, NotFoundException } from '@nestjs/common';

// Дефолтний запис виконання звички
export interface HabitLog {
  id: number;
  habitId: number;   // до якої звички належить цей запис
  date: string;
  completed: boolean;
  note: string;
}

@Injectable()
export class HabitLogsService {
  private logs: HabitLog[] = [];
  private nextId = 1;

  // Повернути всі логи
  findAll(): HabitLog[] {
    return this.logs;
  }

  // Повернути логи конкретної звички
  findByHabit(habitId: number): HabitLog[] {
    return this.logs.filter(l => l.habitId === habitId);
  }

  // Додати запис виконання
  create(dto: { habitId: number; date?: string; completed?: boolean; note?: string }): HabitLog {
    const log: HabitLog = {
      id: this.nextId++,
      habitId: dto.habitId,
      date: dto.date ?? new Date().toISOString().split('T')[0],
      completed: dto.completed ?? true,
      note: dto.note ?? '',
    };
    this.logs.push(log);
    return log;
  }

  update(id: number, dto: { completed?: boolean; note?: string }): HabitLog {
  const log = this.logs.find(l => l.id === id);
  if (!log) throw new NotFoundException(`Лог #${id} не знайдено`);
  Object.assign(log, dto);
  return log;
}

  // Видалити запис
  remove(id: number): { message: string } {
    const index = this.logs.findIndex(l => l.id === id);
    if (index === -1) throw new NotFoundException(`Лог #${id} не знайдено`);
    this.logs.splice(index, 1);
    return { message: `Лог #${id} видалено` };
  }
}