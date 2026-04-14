import { Controller, Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { HabitLogsService } from './habit-logs.service';
import { CreateHabitLogDto } from './dto/create-habit-log.dto';
import { UpdateHabitLogDto } from './dto/update-habit-log.dto';

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
  create(@Body() dto: CreateHabitLogDto) {
    return this.habitLogsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHabitLogDto) {
    return this.habitLogsService.update(+id, dto);
  }

  @Delete(':id') // DELETE /habit-logs/1
  remove(@Param('id') id: string) {
    return this.habitLogsService.remove(+id);
  }
}