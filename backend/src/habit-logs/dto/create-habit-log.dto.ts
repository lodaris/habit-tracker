import { IsNumber, IsOptional, IsBoolean, IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateHabitLogDto {
  @IsNumber()
  @IsNotEmpty()
  habitId: number;

  @IsOptional()
  @IsDateString({}, { message: 'Формат дати: YYYY-MM-DD' })
  date?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  note?: string;
}