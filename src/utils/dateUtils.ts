import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, eachDayOfInterval, parseISO } from 'date-fns';
import { GlucoseRecord } from './supabase';

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
}

export function formatDisplayDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMMM d, yyyy');
}

export function getCurrentWeekRange(): { start: Date; end: Date } {
  const today = new Date();
  return {
    start: startOfWeek(today),
    end: endOfWeek(today),
  };
}

export function getCurrentMonthRange(): { start: Date; end: Date } {
  const today = new Date();
  return {
    start: startOfMonth(today),
    end: endOfMonth(today),
  };
}

export function getCurrentYearRange(): { start: Date; end: Date } {
  const today = new Date();
  return {
    start: startOfYear(today),
    end: endOfYear(today),
  };
}

export function groupRecordsByDate(records: GlucoseRecord[]): Record<string, GlucoseRecord[]> {
  return records.reduce((grouped, record) => {
    const date = formatDate(record.date);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(record);
    return grouped;
  }, {} as Record<string, GlucoseRecord[]>);
}

export function groupRecordsByWeek(records: GlucoseRecord[]): Record<string, GlucoseRecord[]> {
  return records.reduce((grouped, record) => {
    const date = parseISO(record.date);
    const weekStart = formatDate(startOfWeek(date));
    const weekEnd = formatDate(endOfWeek(date));
    const weekKey = `${weekStart} to ${weekEnd}`;
    
    if (!grouped[weekKey]) {
      grouped[weekKey] = [];
    }
    grouped[weekKey].push(record);
    return grouped;
  }, {} as Record<string, GlucoseRecord[]>);
}

export function groupRecordsByMonth(records: GlucoseRecord[]): Record<string, GlucoseRecord[]> {
  return records.reduce((grouped, record) => {
    const date = parseISO(record.date);
    const monthKey = format(date, 'MMMM yyyy');
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(record);
    return grouped;
  }, {} as Record<string, GlucoseRecord[]>);
}
