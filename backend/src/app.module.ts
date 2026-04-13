import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { HabitLogsModule } from './habit-logs/habit-logs.module';

@Module({
  imports: [HabitsModule, HabitLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
