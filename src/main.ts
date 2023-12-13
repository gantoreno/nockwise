import { config as loadEnv } from "npm:dotenv@16.3.1";

import { getStatus } from "./lib/status.ts";
import { setPresenceMode, setSnoozeMode, updateStatus } from "./lib/slack.ts";

import type { Schedule, Settings } from "./types/index.ts";

import _schedule from "../schedule.json" assert { type: "json" };
import _settings from "../settings.json" assert { type: "json" };

loadEnv();

const schedule = _schedule as Schedule;
const settings = _settings as Settings;

Deno.cron("Update slack status", "*/30 * * * *", async () => {
  const now = new Date();

  const status = getStatus(now, schedule, settings);

  await setSnoozeMode(status.snooze);
  await setPresenceMode(status.active);

  await updateStatus(status);
});
