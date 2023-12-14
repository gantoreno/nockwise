import axios from "npm:axios@1.6.2";

import type { Status } from "../types/index.ts";

export async function updateStatus(status: Status): Promise<Response> {
  const formData = new FormData();

  formData.append(
    "token",
    Deno.env.get("SLACK_TOKEN")!,
  );
  formData.append(
    "profile",
    JSON.stringify({
      "status_emoji": status.icon,
      "status_text": status.message,
      "status_text_canonical": "",
      "ooo_message": "",
    }),
  );

  const res = await axios.post(
    Deno.env.get("SLACK_URL")! + "/users.profile.set",
    formData,
    {
      headers: {
        Cookie: Deno.env.get("SLACK_COOKIE"),
      },
    },
  );

  return res.data as Response;
}

export async function setSnoozeMode(snooze: boolean): Promise<Response> {
  const formData = new FormData();

  formData.append(
    "token",
    Deno.env.get("SLACK_TOKEN")!,
  );

  if (snooze) {
    formData.append(
      "num_minutes",
      "30",
    );
  }

  const res = await axios.post(
    Deno.env.get("SLACK_URL")! + (snooze ? "/dnd.setSnooze" : "/dnd.endSnooze"),
    formData,
    {
      headers: {
        Cookie: Deno.env.get("SLACK_COOKIE"),
      },
    },
  );

  return res.data as Response;
}

export async function setPresenceMode(active: boolean): Promise<Response> {
  const formData = new FormData();

  formData.append(
    "token",
    Deno.env.get("SLACK_TOKEN")!,
  );
  formData.append(
    "presence",
    active ? "active" : "away",
  );

  const res = await axios.post(
    Deno.env.get("SLACK_URL")! + "/presence.set",
    formData,
    {
      headers: {
        Cookie: Deno.env.get("SLACK_COOKIE"),
      },
    },
  );

  return res.data as Response;
}
