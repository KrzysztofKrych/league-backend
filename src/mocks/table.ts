import { TableItemDto } from '../table/dto/table-item.dto';

export const TableMock: TableItemDto[] = [{
  season: '2022',
  teamId: 1,
  name: 'Testname',
  results: {
    draw: 1,
    lost: 2,
    points: 1,
    won: 0,
  },
}, {
  season: '2022',
  teamId: 1,
  name: 'Testname2',
  results: {
    draw: 4,
    lost: 0,
    points: 4,
    won: 0,
  },
}];
