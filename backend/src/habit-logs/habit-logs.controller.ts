import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { HabitLogsService } from './habit-logs.service';

@Controller('habit-logs')
export class HabitLogsController {
  constructor(private readonly habitLogsService: HabitLogsService) {}

  @Get() // GET /habit-logs
  findAll() {
    return this.habitLogsService.findAll();
  }

  @Get('habit/:habitId') // GET /habit-logs/habit/1
  findByHabit(@Param('habitId') habitId: string) {
    return this.habitLogsService.findByHabit(+habitId);
  }

  @Post() // POST /habit-logs
  create(@Body() body: { habitId: number; date?: string; completed?: boolean; note?: string }) {
    return this.habitLogsService.create(body);
  }

  @Delete(':id') // DELETE /habit-logs/1
  remove(@Param('id') id: string) {
    return this.habitLogsService.remove(+id);
  }
}