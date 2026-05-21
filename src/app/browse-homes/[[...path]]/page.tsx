import type { Metadata } from 'next';
import BrowseHomesPage from '@/components/BrowseHomesPage';
import {
  buildBrowseHomesPath,
  stringifyRouteSearchParams,
  type RouteSearchParams,
} from '@/lib/browseHomesRoute';

export const metadata: Metadata = {
  title: 'Browse Homes | Pathway',
  description: 'Browse available Pathway homes in supported markets.',
};

interface BrowseHomesRouteProps {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<RouteSearchParams>;
}

export default async function BrowseHomesRoute({
  params,
  searchParams,
}: BrowseHomesRouteProps) {
  const [{ path }, resolvedSearchParams] = await Promise.all([params, searchParams]);

  return (
    <BrowseHomesPage
      initialPath={buildBrowseHomesPath('/browse-homes', path)}
      initialSearch={stringifyRouteSearchParams(resolvedSearchParams)}
    />
  );
}
