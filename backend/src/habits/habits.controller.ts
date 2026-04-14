import { UpdateHabitDto } from './dto/update-habit.dto';
import { Controller, Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits') // всі маршрути починаються з /habits
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get() // GET /habits
  findAll() {
    return this.habitsService.findAll();
  }

  @Get(':id') // GET /habits/1
  findOne(@Param('id') id: string) {
    return this.habitsService.findOne(+id); // +id перетворює рядок на число
  }

  @Post() // POST /habits
  create(@Body() body: { name: string; description?: string; category?: string }) {
    return this.habitsService.create(body);
  }

  @Patch(':id') // PATCH /habits/1
update(@Param('id') id: string, @Body() dto: UpdateHabitDto) {
  return this.habitsService.update(+id, dto);
}

  @Delete(':id') // DELETE /habits/1
  remove(@Param('id') id: string) {
    return this.habitsService.remove(+id);
  }
}