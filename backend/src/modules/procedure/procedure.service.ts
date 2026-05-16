import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async call(sql: string, params?: any[]) {
    return this.dataSource.query(sql, params);
  }
}
