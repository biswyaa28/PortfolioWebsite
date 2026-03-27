declare module "luxon" {
  export class DateTime {
    static now(): DateTime;
    static fromISO(text: string): DateTime;
    toFormat(format: string): string;
    diff(
      other: DateTime,
      units: string[]
    ): { toObject(): Record<string, number | undefined> };
  }
}
