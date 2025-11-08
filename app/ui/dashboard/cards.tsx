import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { getStockQuote } from "@/app/lib/stocks";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {

  const nifty = await getStockQuote("^NSEI"); 
  const sensex = await getStockQuote("^BSESN");
  const banknifty = await getStockQuote("^NSEBANK");
  const niftyit = await getStockQuote("^CNXIT");

  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Sensex" value={sensex?.price ?? 'N/A'} type="collected" />
      <Card title="Nifty 50" value={nifty?.price ?? 'N/A'} type="pending" />
      <Card title="Bank Nifty" value={banknifty?.price ?? 'N/A'} type="invoices" />
      <Card
        title="Gold Prices"
        value={niftyit?.price ?? 'N/A'}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
