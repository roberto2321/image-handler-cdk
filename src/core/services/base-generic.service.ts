import {
  Repository, Connection, ObjectType, FindManyOptions,
} from 'typeorm';
import { db } from '../config/db';

export class BaseGenericService<T> {
  public repo: Repository<T>;

  protected conn: Connection;

  constructor(readonly entity: ObjectType<T>) {}

  protected loadRepos(): void {
    this.repo = this.conn.getRepository(this.entity);
  }

  protected async connect() {
    this.conn = await db.connect();
    this.loadRepos();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  work = (func: Function) => async (...all: any) => {
    await this.connect();
    return func(...all);
  };

  getCount = this.work(async (options: FindManyOptions<T>) => this.repo.count(options));

  findAll = this.work(async (options?: FindManyOptions<T>) => this.repo.find(options));
}