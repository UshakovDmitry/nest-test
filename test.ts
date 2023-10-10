import { Sse } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';



@ApiTags('getTransportRequests')
@Controller('/api/getTransportRequests')
export class TransportRequestsController {
  // ... существующий код
  
  @Sse('sse')
  sse(): Observable<any> {
    return interval(1000).pipe(
      map((_) => ({ data: { message: 'Pong' } }))
    );
  }
}









const eventSource = new EventSource('/api/getTransportRequests/sse');

eventSource.onmessage = (event) => {
  console.log('New message', JSON.parse(event.data));
  
  if (JSON.parse(event.data).message === 'Pong') {
    getTransportRequests(); // вызовите ваш существующий метод, когда получите понг
  }
};
