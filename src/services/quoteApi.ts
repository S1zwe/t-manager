import { Quote } from "../types";

const BASE_URL = "https://zenquotes.io/api/random";

export async function fetchMotivationalQuote(): Promise<Quote> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch quote");
  const data = await response.json();
  const item = Array.isArray(data) ? data[0] : data;
  return { content: item.q, author: item.a };
}
