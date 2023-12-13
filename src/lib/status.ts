import moment from "npm:moment-timezone@0.5.43";

import {
  AFTER_HOURS,
  BEFORE_HOURS,
  DEFAULT,
  WEEKEND,
} from "../constants/status.ts";

import type { Schedule, Settings, Status, WorkDay } from "../types/index.ts";

export function getStatus(
  now: Date,
  schedule: Schedule,
  settings: Settings,
): Status {
  const localDate = moment(now).tz(settings.timezone);

  const currentDay = localDate.weekday();
  const currentHour = localDate.hour();

  const currentSchedule = schedule[currentDay];

  switch (true) {
    case currentSchedule.type === "weekend":
      return WEEKEND;
    case currentHour < (currentSchedule as WorkDay).start:
      return BEFORE_HOURS;
    case currentHour >= (currentSchedule as WorkDay).end:
      return AFTER_HOURS;
    default:
      return DEFAULT;
  }
}
