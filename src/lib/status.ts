import { getDay, getHours } from "npm:date-fns@2.22.1";

import {
  AFTER_HOURS,
  BEFORE_HOURS,
  DEFAULT,
  WEEKEND,
} from "../constants/status.ts";

import type { Schedule, Settings, Status } from "../types/index.ts";

export function getStatus(
  now: Date,
  schedule: Schedule,
  _: Settings,
): Status {
  const currentDay = getDay(now);
  const currentHour = getHours(now);

  const currentSchedule = schedule[currentDay];

  if (currentSchedule.type === "weekend") {
    return WEEKEND;
  }

  switch (true) {
    case currentHour < currentSchedule.start:
      return BEFORE_HOURS;
    case currentHour >= currentSchedule.end:
      return AFTER_HOURS;
    default:
      return DEFAULT;
  }
}
