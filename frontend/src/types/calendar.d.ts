export type Months = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
export type CalendarData = Record<Months, DayData[]>;
export interface DayData {
  year: string;
  quarter: number;
  month: string;
  week: number;
  week_day: number;
  is_today: boolean;
  day: string;
  ad: string;
  AD_date: ADDate;
  events: Event[];
}

export interface ADDate {
  ad: string;
  bs: string;
  bs_day: number;
  bs_month: number;
  bs_year: number;
  tithi: number;
  ns_month: string;
  ns_year: number;
  chandrama: number;
  is_verified: number;
  remarks: Remarks;
}

export enum Remarks {
  Empty = "",
  ToRemoveFrom2079Calendar = "to remove * from 2079 calendar",
}

export interface Event {
  ad: Date;
  bs: string;
  bs_day: number;
  bs_month: number;
  bs_year: number;
  tithi: number;
  ns_month: string;
  ns_year: number;
  chandrama: number;
  is_verified: number;
  remarks: Remarks;
  updated_at: Date;
  event_index_id: number | null;
  event_date: Date | null;
  ex_date: Date | null;
  id: null | string;
  jpid: null;
  jtl: null | string;
  jds: JDS | null;
  jsdt: Date | null;
  jed: Date | null;
  recurring_end_date: Date | null;
  jir: number | null;
  has_reminder: number | null;
  status: number | null;
  duration: number | null;
  rrule: null | string;
  jci: null | string;
  jbo: Jbo | null;
  jcb: Jcb | null;
  jlo: null | string;
  jtp: Jtp | null;
  priority: null | string;
  verification_id: number | null;
  event_verified_date: Date | null;
  verification_status: number | null;
  verification_remarks: null | string;
  exception_date: Date | null;
  new_date: Date | null;
  exception_status: number | null;
  exception_remarks: null;
  holiday_date: Date | null;
  holiday_type: HolidayType | null;
  holiday_status: number | null;
  gh: number;
  jfr: Jfr;
  jeddt: any[] | JeddtClass;
  jevdt?: Jevdt;
}

export enum HolidayType {
  DashainHoliday = "dashain holiday",
  Empty = "",
  GovernmentHoliday = "government holiday",
}

export enum Jbo {
  Ad = "AD",
  Bs = "BS",
  NS = "NS",
}

export enum Jcb {
  AdminGeniussystemsCOM = "admin@geniussystems.com",
  AdminNepalipatroCOM = "admin@nepalipatro.com",
  AdminNepalipatroCOMNP = "admin@nepalipatro.com.np",
  KiranSilwal1GmailCOM = "kiran.silwal1@gmail.com",
}

export interface JDS {
  jnid: string;
  jct: Jct;
  ne: string;
  en: string;
  jiu: string;
  jis: string;
  jbi: string;
  jie: string;
  jbd: Jbd;
  gh: string;
}

export enum Jbd {
  Empty = "",
  अन्तरास्ट्रियमातृभाषादिवस = "अन्तरास्ट्रिय मातृभाषा दिवस",
  घोडेजात्रा = "घोडेजात्रा",
  नेपालनर्सिङदिवस = "नेपाल नर्सिङ दिवस",
  भीमाएकादशीजयाएकादशीव्रत = "भीमा एकादशी | जया एकादशी व्रत",
  विश्वखेलदिवसविकासरशान्तिकालागिअन्तरास्ट्रियखेलदिवस = "विश्व खेल दिवस- विकास र शान्तिका लागि अन्तरास्ट्रिय खेल दिवस",
  विश्वपाईदिवस = "विश्व पाई दिवस ",
  विश्वमौसमदिवस = "विश्व मौसम दिवस",
  श्रीस्वस्थानीव्रतसमापन = "श्री स्वस्थानी व्रत- समापन",
  सोनामल्होसार = "सोनाम ल्होसार",
}

export enum Jct {
  Empty = "",
  International = "international",
  KtmValley = "ktm_valley",
  National = "national",
  Regional = "regional",
  Sports = "Sports",
}

export interface JeddtClass {
  event_id: string;
  ex_date: Date;
  new_date: Date;
  status: number;
  remarks: null;
}

export interface Jevdt {
  event_id: string;
  event_date: Date;
  status: number;
  remarks: null | string;
}

export interface Jfr {
  jfrri: number | string;
  jfrm?: string;
  jfrmd?: string;
  jfrrt?: Jfrrt;
  jfrrbdy?: string;
}

export enum Jfrrt {
  Monthly = "monthly",
  Yearly = "yearly",
}

export enum Jtp {
  Anniversary = "anniversary",
  Others = "others",
}
