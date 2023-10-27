d69d6c2d8e494d47aac84ef650f2cd23
ixiMAWaXXOQ4-ZCx-F4zmlTjLil2-iFqeL76NRK3

f1h2ajZshnZu-m5GnMGYT9zhz-o2XS-k_e6XSsK4

  @Post('correction')
  async transportRequestcorrection(@Body() dto: TransportRequestCorrectionDto ) {
    return this.transportRequestsService.transportRequestCorrection(dto: TransportRequestCorrectionDto);
  }

// DTO для корректировки транспортной заявки
export class TransportRequestCorrectionDto {
  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @IsNotEmpty()
  @IsString()
  driver: string;

  @IsNotEmpty()
  @IsString()
  timeDelivery: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  userIIN: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  userPosition: string;

  @IsNotEmpty()
  @IsString()
  carNumber: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
