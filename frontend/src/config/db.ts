import Dexie, { Table } from "dexie";

export interface Reminder {
  id?: number;
  date: string; //dd-mm-yyyy
  summary: string;
  location: string;
  description: string;
  colorId: string;
  start: {
    date: string;
  };
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  reminders!: Table<Reminder>;

  constructor() {
    super("Calendar");
    this.version(1).stores({
      reminders: "++id, date, title,color", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
