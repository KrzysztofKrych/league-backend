import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class TableDto<T> {
  @IsString()
  @IsNotEmpty()
  @Transform((id) => id.value.toString())
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  season: string;

  @IsArray()
  @IsNotEmpty()
  results: T[];

  constructor(partial: Partial<TableDto<T>>) {
    Object.assign(this, partial);
  }
}
