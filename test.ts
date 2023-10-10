import { Subject } from 'rxjs';

@Injectable()
export class DBService {
  ...
  private dataChangeSubject = new Subject<void>();
  dataChange$ = this.dataChangeSubject.asObservable();
  ...
}




async saveMessage(messageData: any) {
  ...
  if (existingMessage) {
    ...
    this.dataChangeSubject.next();
    return updatedMessage;
  } else {
    ...
    this.dataChangeSubject.next();
    return createdMessage.save();
  }
}



@Sse('sse')
sse(): Observable<MessageEvent> {
  return this.dbService.dataChange$.pipe(
    map(() => ({ data: { message: 'Pong' } }))
  );
}
