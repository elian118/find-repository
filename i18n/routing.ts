import { defineRouting } from 'next-intl/routing';
import { defaultLocale, localeCodes } from '@/consts/locales';

export const routing = defineRouting({
  locales: localeCodes,
  defaultLocale: defaultLocale,
});
