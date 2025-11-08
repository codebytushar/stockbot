import { getStockQuote } from "@/app/lib/stocks";
import { StockCard } from "@/app/ui/stocks/StockCard";
import { AutoRefresh } from "@/app/ui/stocks/AutoRefresh";

export const dynamic = "force-dynamic";

export default async function StocksPage() {
  const symbols = [
    "^NSEI", // Nifty 50
    "^BSESN", // Sensex
    "^NSEBANK", // Bank Nifty
    "^CNXIT", // Nifty IT
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "GOLDBEES.NS",
  ];

  const results = await Promise.all(symbols.map(getStockQuote));
  const stocks = results.filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-800 tracking-tight">
        📊 Live Indian Market Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AutoRefresh interval={30000} />

        {stocks.map((s) => (
          <StockCard key={s!.symbol} stock={s!} />
        ))}
      </div>

      <p className="mt-10 text-center text-gray-400 text-sm">
        Data fetched from Yahoo Finance • Updates on refresh 🔄
      </p>
    </div>
  );
}
