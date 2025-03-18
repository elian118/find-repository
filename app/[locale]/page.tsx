import { redirect } from '@/i18n/navigation';
import { defaultLocale } from '@/consts/locales';

export default function Home() {
  redirect({ href: '/repos', locale: defaultLocale });
}
