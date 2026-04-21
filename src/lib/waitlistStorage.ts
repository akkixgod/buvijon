export type WaitlistEntry = {
  id: number;
  fullName: string;
  telegramUsername: string;
  gmail: string;
  city: string;
  submittedAt: string;
};

const KEY = "buvijon_waitlist";

export function readWaitlist(): WaitlistEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isDuplicate(gmail: string, telegramUsername: string): boolean {
  const list = readWaitlist();
  return list.some(
    (e) => e.gmail === gmail || e.telegramUsername === telegramUsername,
  );
}

export function addEntry(entry: Omit<WaitlistEntry, "id" | "submittedAt">): WaitlistEntry {
  const list = readWaitlist();
  const full: WaitlistEntry = {
    id: Date.now(),
    submittedAt: new Date().toISOString(),
    ...entry,
  };
  list.push(full);
  window.localStorage.setItem(KEY, JSON.stringify(list));
  return full;
}

export const UZBEK_CITIES = [
  "Toshkent",
  "Samarqand",
  "Namangan",
  "Andijon",
  "Farg'ona",
  "Jizzax",
  "Sirdaryo",
  "Qashqadaryo",
  "Navoiy",
  "Buxoro",
  "Xiva",
  "Guliston",
  "Termiz",
  "Qo'qon",
  "Nukus",
];
