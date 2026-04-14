import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty({ message: 'Назва звички не може бути порожньою' })
  @MinLength(2, { message: 'Мінімум 2 символи' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;
}