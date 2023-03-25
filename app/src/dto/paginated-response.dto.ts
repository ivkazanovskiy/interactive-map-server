export class PaginatedResponseDto<T = any, E = any> {
  result: T[];
  count: number;

  constructor(options: { Dto: new (e: E) => T; entities: E[]; count: number }) {
    this.result = options.entities.map((e) => new options.Dto(e));
    this.count = options.count;
  }
}
