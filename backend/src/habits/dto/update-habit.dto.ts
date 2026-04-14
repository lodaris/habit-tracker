import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create-habit.dto';

// Використав PartialType бо він робить всі поля необов'язковими і як на мене це ідеально для patch
export class UpdateHabitDto extends PartialType(CreateHabitDto) {}