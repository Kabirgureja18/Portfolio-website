import { useState, useEffect } from 'react';
import { Calendar, Sparkles } from 'lucide-react';

interface AgeTimerProps {
  birthDateString: string;
}

export default function AgeTimer({ birthDateString }: AgeTimerProps) {
  const [decimalAge, setDecimalAge] = useState<string>('13.90000000');
  const [breakdown, setBreakdown] = useState({
    years: 13,
    months: 11,
    days: 0,
    totalDays: 5000,
  });

  useEffect(() => {
    const birth = new Date(birthDateString).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diffMs = now - birth;
      const msInYear = 1000 * 60 * 60 * 24 * 365.2425;
      const yearsExact = diffMs / msInYear;

      setDecimalAge(yearsExact.toFixed(8));

      // Calculate approximate months/days
      const birthDate = new Date(birthDateString);
      const nowDate = new Date();
      let y = nowDate.getFullYear() - birthDate.getFullYear();
      let m = nowDate.getMonth() - birthDate.getMonth();
      let d = nowDate.getDate() - birthDate.getDate();

      if (d < 0) {
        m -= 1;
        const prevMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
        d += prevMonth.getDate();
      }
      if (m < 0) {
        y -= 1;
        m += 12;
      }

      setBreakdown({
        years: y,
        months: m,
        days: d,
        totalDays: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 50);

    return () => clearInterval(interval);
  }, [birthDateString]);

  const [intPart, decPart] = decimalAge.split('.');

  return (
    <div
      id="age-timer-module"
      className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-3 mb-5">
        <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-zinc-400">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>LIFECYCLE CHRONO // TIME ON EARTH</span>
        </div>
        <div className="text-[11px] font-mono-code text-zinc-400 font-medium tracking-wider">
          BORN SEPTEMBER 2012 • INDORE
        </div>
      </div>

      {/* Main Elegant Decimal Readout */}
      <div className="flex items-baseline gap-1.5 font-mono-code text-zinc-100 mb-4">
        <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          {intPart}
        </span>
        <span className="text-2xl sm:text-3xl font-light text-cyan-400">
          .{decPart}
        </span>
        <span className="text-xs sm:text-sm font-mono-code text-zinc-400 uppercase tracking-widest ml-2">
          YEARS ALIVE
        </span>
      </div>

      {/* Subtle Editorial Metrics Bar */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-900 text-xs font-mono-code text-zinc-400">
        <div>
          <span className="text-zinc-500 block text-[10px]">LIFETIME DAYS</span>
          <span className="text-zinc-200 font-semibold">{breakdown.totalDays.toLocaleString()} Days</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[10px]">CURRENT INTERVAL</span>
          <span className="text-zinc-200 font-semibold">{breakdown.years}y {breakdown.months}m {breakdown.days}d</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[10px]">STATE</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            BUILDING
          </span>
        </div>
      </div>
    </div>
  );
}

