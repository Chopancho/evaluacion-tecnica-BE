import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateUserPhoneDto {
  @IsOptional()
  @IsString()
  number?: number;

  @IsOptional()
  @IsNumber()
  city_code?: number;

  @IsOptional()
  @IsNumber()
  country_code?: number;
}
