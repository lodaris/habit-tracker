import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateHabitDto } from './dto/update-habit.dto';

// Описуємо як виглядає об'єкт «звичка»
export interface Habit {
  id: number;
  name: string;
  description: string;
  category: string;
  createdAt: string;
}

@Injectable()
export class HabitsService {
  // Масив замість БД(вирішив не підключати БД), будемо зберігати в пам'яті
  private habits: Habit[] = [];
  private nextId = 1;

  // Повернути всі звички
  findAll(): Habit[] {
    return this.habits;
  }

  // Знайти одну звичку або кинути помилку 404
  findOne(id: number): Habit {
    const habit = this.habits.find(h => h.id === id);
    if (!habit) throw new NotFoundException(`Звичку #${id} не знайдено`);
    return habit;
  }

    // Оновлюємо тільки ті поля які передали
  update(id: number, dto: UpdateHabitDto): Habit {
    const habit = this.findOne(id);
    Object.assign(habit, dto);
    return habit;
  }

  // Створити нову звичку
  create(dto: { name: string; description?: string; category?: string }): Habit {
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

  // Видалити звичку
  remove(id: number): { message: string } {
    const index = this.habits.findIndex(h => h.id === id);
    if (index === -1) throw new NotFoundException(`Звичку #${id} не знайдено`);
    this.habits.splice(index, 1);
    return { message: `Звичку #${id} видалено` };
  }
}