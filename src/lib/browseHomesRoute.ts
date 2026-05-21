export type RouteSearchParams = Record<string, string | string[] | undefined>;

export function buildBrowseHomesPath(basePath: string, segments?: string[]) {
  if (!segments?.length) return basePath;
  return `${basePath}/${segments.map(encodeURIComponent).join('/')}`;
}

export function stringifyRouteSearchParams(searchParams: RouteSearchParams) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
      return;
    }

    if (value !== undefined) params.set(key, value);
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}
