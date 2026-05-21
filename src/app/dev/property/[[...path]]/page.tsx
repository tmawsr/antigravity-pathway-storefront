import type { Metadata } from 'next';
import BrowseHomesPage from '@/components/BrowseHomesPage';
import {
  buildBrowseHomesPath,
  stringifyRouteSearchParams,
  type RouteSearchParams,
} from '@/lib/browseHomesRoute';

export const metadata: Metadata = {
  title: 'Property | Pathway',
  description: 'View details for an available Pathway home.',
};

interface DevPropertyRouteProps {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<RouteSearchParams>;
}

export default async function DevPropertyRoute({
  params,
  searchParams,
}: DevPropertyRouteProps) {
  const [{ path }, resolvedSearchParams] = await Promise.all([params, searchParams]);

  return (
    <BrowseHomesPage
      initialPath={buildBrowseHomesPath('/dev/property', path)}
      initialSearch={stringifyRouteSearchParams(resolvedSearchParams)}
    />
  );
}
