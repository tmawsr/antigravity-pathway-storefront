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

interface ListingSearchRouteProps {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<RouteSearchParams>;
}

export default async function ListingSearchRoute({
  params,
  searchParams,
}: ListingSearchRouteProps) {
  const [{ path }, resolvedSearchParams] = await Promise.all([params, searchParams]);

  return (
    <BrowseHomesPage
      initialPath={buildBrowseHomesPath('/listing-search', path)}
      initialSearch={stringifyRouteSearchParams(resolvedSearchParams)}
    />
  );
}
