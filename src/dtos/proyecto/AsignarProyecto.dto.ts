import { IsDateString, IsNumber, IsPositive } from 'class-validator';

// DTO para asignar un proyecto a un curso
export class AsignarProyectoDto {
  @IsNumber()
  @IsPositive()
  id!: number;

  @IsNumber()
  @IsPositive()
  cursoId!: number;
}