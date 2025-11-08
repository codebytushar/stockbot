"use client";
import { motion } from "framer-motion";

type Stock = {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

export function StockCard({ stock }: { stock: Stock }) {
  const isUp = stock.change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-white shadow-md hover:shadow-lg border border-indigo-100 p-5 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{stock.name}</h2>
        <p className="text-sm text-gray-500 mb-2">{stock.symbol}</p>
        <p className="text-2xl font-bold text-indigo-700">
          ₹{stock.price.toLocaleString("en-IN")}
        </p>
      </div>

      <motion.p
        animate={{
          color: isUp
            ? ["#16a34a", "#22c55e", "#16a34a"]
            : ["#dc2626", "#ef4444", "#dc2626"],
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className={`text-sm mt-2 font-semibold ${
          isUp ? "text-green-600" : "text-red-600"
        }`}
      >
        {isUp ? "▲" : "▼"} {stock.change.toFixed(2)} (
        {stock.changePercent.toFixed(2)}%)
      </motion.p>
    </motion.div>
  );
}
