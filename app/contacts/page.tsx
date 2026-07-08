'use client';

import Contacts from '@/components/Contacts';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';

export default function ContactsPage() {
  return (
    <main>
      <AppBreadcrumbs />

      <Contacts />
    </main>
  );
}
