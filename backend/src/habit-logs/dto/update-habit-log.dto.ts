import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateHabitLogDto {
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  note?: string;
}