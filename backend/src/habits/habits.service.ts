import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Habit } from '../types';

@Injectable()
export class HabitsService {
  private habits: Habit[] = [];
  private nextId = 1;

  findAll(): Habit[] {
    return this.habits;
  }

  findOne(id: number): Habit {
    const habit = this.habits.find(h => h.id === id);
    if (!habit) throw new NotFoundException(`Звичку #${id} не знайдено`);
    return habit;
  }

  create(dto: CreateHabitDto): Habit {
    const habit: Habit = {
      id: this.nextId++,
      name: dto.name,
      description: dto.description ?? '',
      category: dto.category ?? 'Загальне',
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.habits.push(habit);
    return habit;
  }

  update(id: number, dto: UpdateHabitDto): Habit {
    const habit = this.findOne(id);
    Object.assign(habit, dto);
    return habit;
  }

  remove(id: number): { message: string } {
    const index = this.habits.findIndex(h => h.id === id);
    if (index === -1) throw new NotFoundException(`Звичку #${id} не знайдено`);
    this.habits.splice(index, 1);
    return { message: `Звичку #${id} видалено` };
  }

  getStats(id: number): { total: number; completed: number; rate: number } {
  this.findOne(id);
  return { total: 0, completed: 0, rate: 0 };
  }
}