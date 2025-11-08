// lib/stocks.ts
import  YahooFinance  from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function getStockQuote(symbol: string) {
  console.log(`Fetching stock data for symbol: ${symbol}`);

  try {
    const data = await yahooFinance.quote(symbol);
    if (!data) {
      console.warn(`No data returned for ${symbol}`);
      return null;
    }

    return {
      symbol,
      name: data.shortName || symbol,
      price: data.regularMarketPrice ?? data.previousClose ?? 0,
      change: data.regularMarketChange ?? 0,
      changePercent: data.regularMarketChangePercent ?? 0,
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    return null;
  }
}
