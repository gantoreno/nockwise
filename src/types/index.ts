export type Settings = {
  timezone: string;
};

export type WorkDay = {
  type: "weekday";
  start: number;
  end: number;
};

export type Weekend = {
  type: "weekend";
};

export type Schedule = (WorkDay | Weekend)[];

export type Status = {
  icon: string;
  snooze: boolean;
  active: boolean;
  message: string;
};

export type Response = {
  ok: boolean;
};
