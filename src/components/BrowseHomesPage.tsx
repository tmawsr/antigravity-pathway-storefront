import BrowseHomesEmbed from '@/components/BrowseHomesEmbed';
import { APP_VERSION } from '@/lib/appVersion';

interface BrowseHomesPageProps {
  initialPath: string;
  initialSearch?: string;
}

export default function BrowseHomesPage({
  initialPath,
  initialSearch,
}: BrowseHomesPageProps) {
  return (
    <BrowseHomesEmbed
      assetVersion={APP_VERSION}
      initialPath={initialPath}
      initialSearch={initialSearch}
    />
  );
}
