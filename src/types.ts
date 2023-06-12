export interface Event {
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
  remarks: string;
  updated_at: string;
  event_index_id: number;
  event_date: string;
  ex_date: string | null;
  id: string;
  jpid: string | null;
  jtl: string;
  jds: {
    jnid: string;
    jct: string;
    ne: string;
    en: string;
    jiu: string;
    jis: string;
    jbi: string;
    jie: string;
    jbd: string;
    gh: string;
  };
  jsdt: string;
  jed: string;
  recurring_end_date: string;
  jir: number;
  has_reminder: number;
  status: number;
  duration: number;
  rrule: string;
  jci: string;
  jbo: string;
  jcb: string;
  gh: number;
  jlo: string;
  jtp: string | null;
  priority: string | null;
  verification_id: number | null;
  event_verified_date: string | null;
  verification_status: number | null;
  verification_remarks: string | null;
  exception_date: string | null;
  new_date: string | null;
  exception_status: string | null;
  exception_remarks: string | null;
  holiday_date: string | null;
  holiday_type: string;
  holiday_status: number | null;
  jfr: {
    jfrri: string;
    jfrm: string;
    jfrmd: string;
    jfrrt: string;
  };
  jeddt: string[];
  jevdt: {
    event_id: string;
    event_date: string;
    status: number;
    remarks: string;
  };
}

export interface Day {
  year: string;
  quarter: number;
  month: string;
  week: number;
  week_day: number;
  is_today: boolean;
  day: string;
  ad: string;
  AD_date: {
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
    remarks: string;
  };
  events: Event[];
}
