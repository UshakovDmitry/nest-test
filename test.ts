@Injectable()
export class DBService {
  private dataChangeSubject: Subject<void>;
  public dataChange$: Observable<void>;

  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly httpService: HttpService
  ) {
    this.dataChangeSubject = new Subject<void>();
    this.dataChange$ = this.dataChangeSubject.asObservable();
  }

  // остальной ваш код...
}
