import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const convertToLocalDateTime = (utcStr) => {
  const utcDateTime = parseISO(utcStr);
  const localDateTime = toZonedTime(
    utcDateTime,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  return format(localDateTime, 'yyyy-MM-dd HH:mm');
};
