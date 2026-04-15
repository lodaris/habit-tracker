import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitLogDto } from './dto/create-habit-log.dto';
import { UpdateHabitLogDto } from './dto/update-habit-log.dto';
import { HabitLog } from '../types';

@Injectable()
export class HabitLogsService {
  private logs: HabitLog[] = [];
  private nextId = 1;

  findAll(): HabitLog[] {
    return this.logs;
  }

  findByHabit(habitId: number): HabitLog[] {
    return this.logs.filter(l => l.habitId === habitId);
  }

  create(dto: CreateHabitLogDto): HabitLog {
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

  update(id: number, dto: UpdateHabitLogDto): HabitLog {
    const log = this.logs.find(l => l.id === id);
    if (!log) throw new NotFoundException(`Лог #${id} не знайдено`);
    Object.assign(log, dto);
    return log;
  }

  remove(id: number): { message: string } {
    const index = this.logs.findIndex(l => l.id === id);
    if (index === -1) throw new NotFoundException(`Лог #${id} не знайдено`);
    this.logs.splice(index, 1);
    return { message: `Лог #${id} видалено` };
  }
}