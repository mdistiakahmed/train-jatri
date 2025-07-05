import { MetadataRoute } from 'next';
import { allStationNames } from '@/data/Stations/0_all_station_name';
import { uniqueTrainNames } from '@/utils/trainNames';
import { paths } from '@/utils/trainRoutes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.trainjatri.com';
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/station`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/trains`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/routes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Dynamic station routes
  const stationRoutes: MetadataRoute.Sitemap = allStationNames.map((station: string) => ({
    url: `${baseUrl}/station/${station.split(' ').join('-').toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Dynamic train routes
  const trainRoutes: MetadataRoute.Sitemap = uniqueTrainNames.map((train: string) => ({
    url: `${baseUrl}/trains/${train.split(' ').join('-').toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Dynamic route routes
  const routeRoutes: MetadataRoute.Sitemap = paths.map((route: { from: string; to: string }) => ({
    url: `${baseUrl}/routes/${route.from.toLowerCase()}-to-${route.to.toLowerCase().replace(/_/g, '-')}-train-schedule`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...stationRoutes, ...trainRoutes, ...routeRoutes];
}
