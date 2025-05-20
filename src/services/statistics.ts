import {
  RawStatistics,
  StatisticsState,
  TimeRange,
  ChartData,
  BlogVisit,
} from "@/types/blog";
import {
  format,
  parse,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  eachMonthOfInterval,
  isSameDay,
  isWithinInterval,
  getDaysInMonth,
  addDays,
  subMonths,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { tr } from "date-fns/locale";

// Trend hesaplama
const calculateTrend = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

// Belirli bir tarih aralığındaki ziyaretleri hesapla
const calculateVisitsInRange = (
  visits: BlogVisit[],
  start: Date,
  end: Date
): number => {
  return visits.filter((visit) => {
    const visitDate = parse(visit.date, "yyyy-MM-dd", new Date());
    return isWithinInterval(visitDate, { start, end });
  }).length;
};

// Belirli bir tarih aralığındaki toplam süreyi hesapla
const calculateTotalDurationInRange = (
  visits: BlogVisit[],
  start: Date,
  end: Date
): number => {
  const visitsInRange = visits.filter((visit) => {
    const visitDate = parse(visit.date, "yyyy-MM-dd", new Date());
    return isWithinInterval(visitDate, { start, end });
  });

  return visitsInRange.reduce((sum, visit) => sum + visit.duration, 0);
};

// Haftalık verileri hazırla
const prepareWeeklyData = (
  visits: BlogVisit[],
  type: "visits" | "duration"
): ChartData[] => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return days.map((day) => {
    const dayVisits = visits.filter((visit) =>
      isSameDay(parse(visit.date, "yyyy-MM-dd", new Date()), day)
    );

    const dayName = format(day, "EEE", { locale: tr });
    const dayNumber = format(day, "d", { locale: tr });
    const formattedName = `${dayNumber} ${dayName}`;

    if (type === "visits") {
      return {
        name: formattedName,
        value: dayVisits.length,
      };
    } else {
      const avgDuration =
        dayVisits.length > 0
          ? dayVisits.reduce((sum, visit) => sum + visit.duration, 0) /
            dayVisits.length
          : 0;

      return {
        name: formattedName,
        value: avgDuration,
      };
    }
  });
};

// Aylık verileri hazırla
const prepareMonthlyData = (
  visits: BlogVisit[],
  type: "visits" | "duration"
): ChartData[] => {
  const today = new Date();
  const daysInMonth = getDaysInMonth(today);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const days = Array.from({ length: daysInMonth }, (_, i) =>
    addDays(monthStart, i)
  );

  return days.map((day) => {
    const dayNumber = day.getDate();
    const dayVisits = visits.filter((visit) =>
      isSameDay(parse(visit.date, "yyyy-MM-dd", new Date()), day)
    );

    // Gün gösterim mantığı
    const showDay =
      dayNumber === 1 || dayNumber === daysInMonth || dayNumber % 2 === 1;

    if (type === "visits") {
      return {
        name: showDay ? dayNumber.toString() : "",
        value: dayVisits.length,
        realDay: dayNumber, // Tooltip için gerçek gün
      };
    } else {
      const avgDuration =
        dayVisits.length > 0
          ? dayVisits.reduce((sum, visit) => sum + visit.duration, 0) /
            dayVisits.length
          : 0;

      return {
        name: showDay ? dayNumber.toString() : "",
        value: avgDuration,
        realDay: dayNumber, // Tooltip için gerçek gün
      };
    }
  });
};

// Yıllık verileri hazırla
const prepareYearlyData = (
  visits: BlogVisit[],
  type: "visits" | "duration"
): ChartData[] => {
  const today = new Date();
  const yearStart = new Date(today.getFullYear(), 0, 1);
  const months = eachMonthOfInterval({ start: yearStart, end: today });

  return months.map((monthStart) => {
    const monthEnd = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() + 1,
      0
    );

    if (type === "visits") {
      const monthVisits = calculateVisitsInRange(visits, monthStart, monthEnd);
      return {
        name: format(monthStart, "LLL", { locale: tr }),
        value: monthVisits,
      };
    } else {
      const totalDuration = calculateTotalDurationInRange(
        visits,
        monthStart,
        monthEnd
      );
      return {
        name: format(monthStart, "LLL", { locale: tr }),
        value: totalDuration,
      };
    }
  });
};

// Günlük verileri hazırla
const prepareDailyData = (
  visits: BlogVisit[],
  type: "visits" | "duration"
): ChartData[] => {
  const hours = Array.from({ length: 9 }, (_, i) => i * 3); // 0, 3, 6, 9, 12, 15, 18, 21, (24 için özel durum)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return hours.map((hour) => {
    const startHour = new Date(today);
    startHour.setHours(hour);
    const endHour = new Date(today);
    endHour.setHours(hour === 21 ? 24 : hour + 3); // 21:00 için bitiş 24:00 (23:59) olacak

    const hourVisits = visits.filter((visit) => {
      const visitDate = parse(visit.date, "yyyy-MM-dd", new Date());
      const visitTime = parse(visit.time, "HH:mm", new Date());
      const visitHour = visitTime.getHours();

      if (hour === 21) {
        // 21:00-23:59 arası için özel kontrol
        return (
          isSameDay(visitDate, today) && visitHour >= 21 && visitHour <= 23
        );
      }

      return (
        isSameDay(visitDate, today) && visitHour >= hour && visitHour < hour + 3
      );
    });

    if (type === "visits") {
      return {
        name: hour === 21 ? "21:00" : `${hour.toString().padStart(2, "0")}:00`,
        value: hourVisits.length,
      };
    } else {
      // Toplam süreyi hesapla
      const totalDuration = hourVisits.reduce(
        (sum, visit) => sum + visit.duration,
        0
      );
      return {
        name: hour === 21 ? "21:00" : `${hour.toString().padStart(2, "0")}:00`,
        value: totalDuration,
      };
    }
  });
};

// Belirli bir zaman aralığı için verileri hazırla
const prepareChartData = (
  data: RawStatistics,
  timeRange: TimeRange,
  type: "visits" | "duration"
): ChartData[] => {
  switch (timeRange) {
    case "daily":
      return prepareDailyData(data.visits, type);
    case "weekly":
      return prepareWeeklyData(data.visits, type);
    case "monthly":
      return prepareMonthlyData(data.visits, type);
    case "yearly":
      return prepareYearlyData(data.visits, type);
  }
};

// İstatistikleri hesapla
export const calculateStatistics = (
  data: RawStatistics,
  timeRange: TimeRange
): {
  statistics: StatisticsState;
  chartData: { visits: ChartData[]; duration: ChartData[] };
} => {
  const today = new Date();
  let currentStart: Date;
  let previousStart: Date;
  let currentEnd: Date;
  let previousEnd: Date;

  switch (timeRange) {
    case "daily":
      currentStart = new Date(today);
      currentStart.setHours(0, 0, 0, 0);
      currentEnd = new Date(today);
      currentEnd.setHours(23, 59, 59, 999);
      previousStart = new Date(today);
      previousStart.setDate(previousStart.getDate() - 1);
      previousStart.setHours(0, 0, 0, 0);
      previousEnd = new Date(today);
      previousEnd.setDate(previousEnd.getDate() - 1);
      previousEnd.setHours(23, 59, 59, 999);
      break;
    case "weekly":
      currentStart = startOfWeek(today, { weekStartsOn: 1 });
      currentEnd = endOfWeek(today, { weekStartsOn: 1 });
      previousStart = startOfWeek(subMonths(today, 1), { weekStartsOn: 1 });
      previousEnd = endOfWeek(subMonths(today, 1), { weekStartsOn: 1 });
      break;
    case "monthly":
      currentStart = startOfMonth(today);
      currentEnd = endOfMonth(today);
      previousStart = startOfMonth(subMonths(today, 1));
      previousEnd = endOfMonth(subMonths(today, 1));
      break;
    case "yearly":
      currentStart = startOfYear(today);
      currentEnd = endOfYear(today);
      previousStart = startOfYear(subYears(today, 1));
      previousEnd = endOfYear(subYears(today, 1));
      break;
  }

  const currentVisits = calculateVisitsInRange(
    data.visits,
    currentStart,
    currentEnd
  );
  const previousVisits = calculateVisitsInRange(
    data.visits,
    previousStart,
    previousEnd
  );
  const visitsTrend = calculateTrend(currentVisits, previousVisits);

  const currentDuration = calculateTotalDurationInRange(
    data.visits,
    currentStart,
    currentEnd
  );
  const previousDuration = calculateTotalDurationInRange(
    data.visits,
    previousStart,
    previousEnd
  );
  const durationTrend = calculateTrend(currentDuration, previousDuration);

  const trendText = {
    daily: "dünden bugüne",
    weekly: "geçen haftaya göre",
    monthly: "geçen aya göre",
    yearly: "geçen yıla göre",
  }[timeRange];

  return {
    statistics: {
      totalVisits: {
        id: "total-visits",
        title: "Toplam Ziyaret",
        value: currentVisits,
        icon: "users",
        trend: {
          value: Math.abs(visitsTrend),
          isPositive: visitsTrend > 0,
          text: trendText,
        },
        color: "blue",
      },
      averageTime: {
        id: "total-time",
        title: "Toplam Geçirilen Süre",
        value: currentDuration,
        icon: "clock",
        trend: {
          value: Math.abs(durationTrend),
          isPositive: durationTrend > 0,
          text: trendText,
        },
        color: "green",
      },
    },
    chartData: {
      visits: prepareChartData(data, timeRange, "visits"),
      duration: prepareChartData(data, timeRange, "duration"),
    },
  };
};
