import { DeleteResult } from 'typeorm';

export interface BaseInterface<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;

  delete(id: number): Promise<DeleteResult> | void;
}
