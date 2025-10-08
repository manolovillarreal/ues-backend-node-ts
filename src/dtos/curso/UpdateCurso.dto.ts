import { IsString, Length, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class UpdateCursoDto {
  @IsOptional()
  @IsString()
  @Length(2, 150)
  nombre?: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  codigo?: string;

  @IsOptional()
  @IsNumber()
  facultadId?: number;

  @IsOptional()
  @IsNumber()
  profesorId?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}