export interface WordOption {
  word: string;
  count: number;
}
export interface OptionsMap {
  [name: string]: WordOption[];
}