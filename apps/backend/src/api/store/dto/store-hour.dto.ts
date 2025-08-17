import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt } from 'class-validator';
export enum Day {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}
export class StoreHourDto {
  @ApiProperty({ example: 'MON', description: '요일 (MON~SUN)' })
  @IsEnum(Day)
  day: Day;

  @ApiProperty({ example: 10, description: '시작 시(hour)' })
  @IsInt()
  startHour: number;

  @ApiProperty({ example: 30, description: '시작 분(min)' })
  @IsInt()
  startMin: number;

  @ApiProperty({ example: 22, description: '종료 시(hour)' })
  @IsInt()
  endHour: number;

  @ApiProperty({ example: 0, description: '종료 분(min)' })
  @IsInt()
  endMin: number;

  @ApiProperty({ example: true, description: '영업 여부' })
  @IsBoolean()
  open: boolean;
}
