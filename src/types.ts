export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type SortType = 'id' | 'wins' | 'time';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
