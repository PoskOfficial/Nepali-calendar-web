import Dexie, { Table } from "dexie";

export interface Event {
  id?: number;
  date?: string; //dd-mm-yyyy
  summary?: string;
  location?: string;
  description?: string;
  colorId?: string;
  start: {
    date?: string;
    dateTime?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
  };
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  reminders!: Table<Event>;

  constructor() {
    super("Calendar");
    this.version(1).stores({
      reminders: "++id, date, summary, location, description, colorId, start, end",
    });
  }
}

export const db = new MySubClassedDexie();
