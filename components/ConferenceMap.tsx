'use client';

import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/Button';
import type { Map as LeafletMap } from 'leaflet';
import { Home, MapPin, Minus, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false },
);
// eslint-disable-next-line @typescript-eslint/naming-convention
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false },
);
// eslint-disable-next-line @typescript-eslint/naming-convention
const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false },
);
// eslint-disable-next-line @typescript-eslint/naming-convention
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

interface Conference {
  year: number;
  city: string;
  location: string;
  theme?: string;
}

interface ConferenceMapProps {
  conferences: Conference[];
}

interface CityCluster {
  city: string;
  coords: { lat: number; lng: number };
  conferences: Conference[];
}

const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  'The Hague, Netherlands': { lat: 52.0705, lng: 4.3007 },
  'Antwerp, Belgium': { lat: 51.2194, lng: 4.4025 },
  Luxembourg: { lat: 49.6116, lng: 6.1319 },
  'Utrecht, Netherlands': { lat: 52.0907, lng: 5.1214 },
  'Amsterdam, Netherlands': { lat: 52.3676, lng: 4.9041 },
  'Liège, Belgium': { lat: 50.6292, lng: 5.5797 },
  'Brussels, Belgium': { lat: 50.8503, lng: 4.3517 },
  'Leiden, Netherlands': { lat: 52.1601, lng: 4.497 },
  'Leuven, Belgium': { lat: 50.8798, lng: 4.7005 },
  'Belval, Luxembourg': { lat: 49.5045, lng: 5.9481 },
  'Maastricht, Netherlands': { lat: 50.8514, lng: 5.6909 },
};

const cityAliases: Record<string, string[]> = {
  'The Hague, Netherlands': ['the hague'],
  'Antwerp, Belgium': ['antwerp'],
  'Belval, Luxembourg': ['belval'],
  'Amsterdam, Netherlands': ['amsterdam'],
  'Liège, Belgium': ['liège', 'liege'],
  'Brussels, Belgium': ['brussels'],
  'Leiden, Netherlands': ['leiden'],
  'Leuven, Belgium': ['leuven'],
  'Maastricht, Netherlands': ['maastricht'],
  Luxembourg: ['luxembourg'],
  'Utrecht, Netherlands': ['utrecht'],
};

const center: [number, number] = [50.85, 4.95];
const homeZoom = 7;

function normaliseLocation(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function resolveConferenceCity(conference: Conference) {
  const locationText = normaliseLocation(
    `${conference.city} ${conference.location}`,
  );

  return Object.entries(cityAliases).find(([, aliases]) => {
    return aliases.some((alias) =>
      locationText.includes(normaliseLocation(alias)),
    );
  })?.[0];
}

function ConferencePopup({
  city,
  conferences,
}: Pick<CityCluster, 'city' | 'conferences'>) {
  const count = conferences.length;

  return (
    <Popup>
      <div className="p-2 min-w-50">
        <div className="flex items-start gap-2 mb-3 pb-2 border-b border-stone-200">
          <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-stone-800">{city}</p>
            <p className="text-xs text-stone-500">
              {count} conference{count > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {conferences.map((conf) => (
            <div key={`conf-${conf.year}`} className="text-sm">
              <div className="font-semibold text-teal-700">{conf.year}</div>
              {conf.theme && (
                <div className="text-xs text-stone-600 mt-0.5">
                  {conf.theme}
                </div>
              )}
              <div className="text-xs text-stone-500 mt-0.5">
                {conf.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
}

export function ConferenceMap({ conferences }: ConferenceMapProps) {
  const [map, setMap] = useState<LeafletMap | null>(null);

  const setMapRef = useCallback((instance: LeafletMap | null) => {
    setMap(instance);
  }, []);

  const conferencesByCity = useMemo(() => {
    return conferences.reduce(
      (acc, conf) => {
        const city = resolveConferenceCity(conf);
        if (!city) return acc;

        const conferencesForCity = acc[city] ?? [];
        conferencesForCity.push(conf);
        acc[city] = conferencesForCity;

        return acc;
      },
      {} as Partial<Record<string, Conference[]>>,
    );
  }, [conferences]);

  const cityClusters = useMemo(() => {
    return Object.entries(cityCoordinates).flatMap(([city, coords]) => {
      const conferencesInCity = conferencesByCity[city] ?? [];

      if (conferencesInCity.length === 0) return [];

      return [
        {
          city,
          coords,
          conferences: conferencesInCity,
        },
      ];
    });
  }, [conferencesByCity]);

  useEffect(() => {
    let isMounted = true;

    const loadLeaflet = async () => {
      try {
        const module = await import('leaflet');
        if (!isMounted) return;
        const leaflet = module.default;

        delete (leaflet.Icon.Default.prototype as { _getIconUrl?: unknown })
          ._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: undefined,
          iconUrl: undefined,
          shadowUrl: undefined,
        });
      } catch (error) {
        // Ignore loading errors since the map is non-critical
        console.error('Failed to load Leaflet', error);
      }
    };

    loadLeaflet().catch((error) => {
      // Ignore since map is optional
      console.error('Failed to initialise Leaflet', error);
    });

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="bg-linear-to-br from-accent to-background rounded-2xl p-8 border border-accent">
      <div className="text-center mb-6">
        <h3 className="text-xl font-merriweather font-bold text-foreground mb-2">
          Conference Locations
        </h3>
        <p className="text-sm text-muted-foreground">
          Annual conference hosts across the DH BeNeLux region
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-stone-200">
        <div className="absolute right-4 top-4 z-10 grid gap-2">
          <div className="grid overflow-hidden rounded-md border border-stone-200 bg-white/95 shadow-medium backdrop-blur">
            <Button
              aria-label="Zoom in"
              className="h-10 w-10 rounded-none border-b border-stone-200"
              disabled={!map}
              onClick={() => map?.zoomIn()}
              size="icon"
              type="button"
              variant="ghost"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              aria-label="Zoom out"
              className="h-10 w-10 rounded-none"
              disabled={!map}
              onClick={() => map?.zoomOut()}
              size="icon"
              type="button"
              variant="ghost"
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
          <Button
            aria-label="Reset map to home location"
            className="h-10 w-10 border border-stone-200 bg-white/95 text-teal-700 shadow-medium backdrop-blur hover:bg-teal-50"
            disabled={!map}
            onClick={() => map?.setView(center, homeZoom)}
            size="icon"
            title="Reset map to home location"
            type="button"
            variant="ghost"
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>

        <MapContainer
          center={center}
          ref={setMapRef}
          scrollWheelZoom={false}
          zoom={homeZoom}
          zoomControl={false}
          style={{ height: '500px', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {cityClusters.map(
            ({ city, coords, conferences: conferencesInCity }) => {
              const count = conferencesInCity.length;
              const radius = Math.max(10, Math.min(25, 8 + count * 4));

              return (
                <CircleMarker
                  key={`city-${city}`}
                  center={[coords.lat, coords.lng]}
                  radius={radius}
                  pathOptions={{
                    fillColor: '#0d9488',
                    fillOpacity: 0.8,
                    color: 'white',
                    weight: 3,
                  }}
                >
                  <ConferencePopup
                    city={city}
                    conferences={conferencesInCity}
                  />
                </CircleMarker>
              );
            },
          )}
        </MapContainer>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-600 border-2 border-white shadow" />
          <span>Conference location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-teal-600 border-2 border-white shadow" />
          <span>Larger circles = multiple conferences</span>
        </div>
      </div>
    </div>
  );
}
