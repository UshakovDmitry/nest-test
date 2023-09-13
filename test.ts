...
import { DatabaseService } from '../database/database.service';

@ApiTags('rabbitmq')
@Controller('/api/rabbitmq')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService, private readonly dbService: DatabaseService) {}

  ...

  @Get('/all-messages')
  async getAllMessages() {
    return await this.dbService.findAll();
  }
}
