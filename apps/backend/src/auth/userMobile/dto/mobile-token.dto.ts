import { IsString } from 'class-validator';

export class GetMobileTokenDto {
  @IsString()
  tableToken: string;
}
