'use client';

import FooterContent from './FooterContent';

interface AppFooterProps {
  onOpenRequisites?: () => void;
}

export default function AppFooter({ onOpenRequisites }: AppFooterProps) {
  return <FooterContent onOpenRequisites={onOpenRequisites} />;
}
