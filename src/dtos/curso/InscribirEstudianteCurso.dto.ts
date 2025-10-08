import { IsNumber } from 'class-validator';

export class InscribirEstudianteCursoDto {
  @IsNumber()
  estudianteId!: number;
}