import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class PaginationOptions implements IPaginationOptions {
  limit = 20;
  page = 1;
}
