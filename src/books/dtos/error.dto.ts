import { ApiProperty } from '@nestjs/swagger';

export class ErrorDTO {
  @ApiProperty({ default: 'fail' })
  status: string;

  @ApiProperty()
  message: string;
}
