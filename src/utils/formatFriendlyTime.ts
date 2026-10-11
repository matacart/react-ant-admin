import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import cookie from 'react-cookies';

dayjs.extend(utc);
dayjs.extend(timezone);

const WEEK_MAP = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

/** 从 cookie 读取合法时区名；读不到或非法返回 null（走本地时区） */
function getTimezone(): string | null {
  try {
    const tz = cookie.load('timezone')?.time_zone_name;
    if (!tz) return null;
    dayjs().tz(tz); // 校验，非法时区会抛错
    return tz;
  } catch {
    return null;
  }
}

/** 时间戳 → 指定时区的 dayjs；tz 为 null 时用本地时区 */
function toTz(ts: number | undefined, tz: string | null): dayjs.Dayjs {
  const base = ts == null ? dayjs() : dayjs(ts);
  return tz ? base.tz(tz) : base;
}

function absoluteFormat(d: dayjs.Dayjs, n: dayjs.Dayjs): string {
  const hm = d.format('HH:mm');
  const dayDiff = Math.round(n.startOf('day').diff(d.startOf('day'), 'day'));
  if (dayDiff === 0) return `今天 ${hm}`;
  if (dayDiff === 1) return `昨天 ${hm}`;
  if (dayDiff === 2) return `前天 ${hm}`;
  if (dayDiff > 2 && dayDiff < 7) return `${WEEK_MAP[d.day()]} ${hm}`;
  if (d.year() === n.year()) return d.format('MM-DD HH:mm');
  return d.format('YYYY-MM-DD HH:mm');
}

/**
 * 时间戳 → 友好时间文案
 * @param ts  毫秒级时间戳
 * @param now 参照时间，默认当前时间（便于测试）
 */
export function friendlyTime(ts: number, now?: number): string {
  const tz = getTimezone();

  const d = toTz(ts, tz);
  const n = toTz(now, tz);

  const diffMs = n.diff(d);
  if (diffMs < 0) return absoluteFormat(d, n);

  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return '刚刚';
  if (diffMin < 60) return `${diffMin}分钟前`;

  return absoluteFormat(d, n);
}