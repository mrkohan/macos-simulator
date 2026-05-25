import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FaSearch, FaLocationArrow, FaStar, FaDirections } from 'react-icons/fa';

const Container = styled.div`
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  background: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Sidebar = styled.div`
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  z-index: 2;
`;

const SearchWrap = styled.div`
  padding: 12px;
  border-bottom: 1px solid #e8e8ed;
  position: relative;

  svg {
    position: absolute;
    left: 22px;
    top: 50%;
    transform: translateY(-50%);
    color: #86868b;
    font-size: 13px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px 10px 34px;
  border: none;
  border-radius: 10px;
  background: #f0f0f5;
  font-size: 14px;
  outline: none;

  &:focus {
    background: #e8e8ed;
  }
`;

const SectionLabel = styled.div`
  padding: 10px 14px 6px;
  font-size: 11px;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
`;

const PlaceList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const PlaceItem = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: ${(props) => (props.active ? '#e8f4ff' : 'transparent')};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? '#e8f4ff' : '#f5f5f7')};
  }
`;

const PlaceIcon = styled.span`
  font-size: 18px;
  line-height: 1.2;
`;

const PlaceInfo = styled.div`
  flex: 1;
  min-width: 0;

  strong {
    display: block;
    font-size: 14px;
    color: #1d1d1f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 12px;
    color: #86868b;
  }
`;

const MapMain = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MapFrame = styled.iframe`
  flex: 1;
  width: 100%;
  min-height: 0;
  border: none;
  background: #d4e8d4;
`;

const MapControls = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 3;
`;

const MapButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 18px;
  color: #1d1d1f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f7;
  }
`;

const InfoCard = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: min(420px, calc(100% - 40px));
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
  z-index: 3;
`;

const InfoTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 4px;
`;

const InfoMeta = styled.div`
  font-size: 12px;
  color: #86868b;
  margin-bottom: 12px;
`;

const InfoActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.primary ? '#007aff' : '#e8e8ed')};
  color: ${(props) => (props.primary ? '#fff' : '#1d1d1f')};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    opacity: 0.9;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  color: #555;
  z-index: 4;
`;

const PLACES = {
  'san francisco': { name: 'San Francisco, CA', lat: 37.7749, lon: -122.4194, country: 'USA' },
  'new york': { name: 'New York, NY', lat: 40.7128, lon: -74.006, country: 'USA' },
  london: { name: 'London, UK', lat: 51.5074, lon: -0.1278, country: 'United Kingdom' },
  paris: { name: 'Paris, France', lat: 48.8566, lon: 2.3522, country: 'France' },
  tokyo: { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503, country: 'Japan' },
  istanbul: { name: 'Istanbul, Turkey', lat: 41.0082, lon: 28.9784, country: 'Turkey' },
  ankara: { name: 'Ankara, Turkey', lat: 39.9334, lon: 32.8597, country: 'Turkey' },
  berlin: { name: 'Berlin, Germany', lat: 52.52, lon: 13.405, country: 'Germany' },
  sydney: { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093, country: 'Australia' },
};

const FAVORITES = [
  PLACES['san francisco'],
  PLACES.istanbul,
  PLACES.london,
  PLACES.tokyo,
];

const DEFAULT_PLACE = PLACES['san francisco'];

function getEmbedUrl(lat, lon, span = 0.08) {
  const latSpan = span * 0.7;
  const bbox = `${lon - span},${lat - latSpan},${lon + span},${lat + latSpan}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

function findLocalPlace(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const exact = PLACES[q];
  if (exact) return exact;
  return Object.entries(PLACES).find(([key]) => q.includes(key) || key.includes(q))?.[1];
}

async function searchNominatim(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&limit=5`;
  const res = await fetch(url, {
    headers: { 'Accept-Language': 'en', 'User-Agent': 'macos-simulator/1.0' },
  });
  if (!res.ok) throw new Error('Search failed');
  const data = await res.json();
  return data.map((item) => ({
    name: item.display_name.split(',')[0],
    subtitle: item.display_name,
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
    country: item.display_name.split(',').pop()?.trim() || '',
  }));
}

function Maps() {
  const [query, setQuery] = useState('');
  const [activePlace, setActivePlace] = useState(DEFAULT_PLACE);
  const [results, setResults] = useState([]);
  const [recents, setRecents] = useState([DEFAULT_PLACE]);
  const [mapSpan, setMapSpan] = useState(0.08);
  const [loading, setLoading] = useState(false);
  const [directionsHint, setDirectionsHint] = useState('');
  const debounceRef = useRef(null);

  const selectPlace = useCallback((place) => {
    const normalized = {
      name: place.name,
      lat: place.lat,
      lon: place.lon,
      country: place.country || place.subtitle || '',
      subtitle: place.subtitle,
    };
    setActivePlace(normalized);
    setResults([]);
    setRecents((prev) => {
      const filtered = prev.filter(
        (p) => p.lat !== normalized.lat || p.lon !== normalized.lon
      );
      return [normalized, ...filtered].slice(0, 6);
    });
  }, []);

  const runSearch = useCallback(
    async (searchQuery) => {
      const q = searchQuery.trim();
      if (!q) return;

      const local = findLocalPlace(q);
      if (local) {
        selectPlace(local);
        return;
      }

      setLoading(true);
      try {
        const found = await searchNominatim(q);
        if (found.length === 0) {
          setResults([]);
          return;
        }
        setResults(found);
        selectPlace(found[0]);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [selectPlace]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      runSearch(query);
    }, 600);
    return () => clearTimeout(debounceRef.current);
  }, [query, runSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  const zoomIn = () => setMapSpan((s) => Math.max(0.02, s * 0.6));
  const zoomOut = () => setMapSpan((s) => Math.min(0.5, s * 1.4));

  const mapUrl = getEmbedUrl(activePlace.lat, activePlace.lon, mapSpan);

  return (
    <Container>
      <Sidebar>
        <SearchWrap>
          <FaSearch />
          <form onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="Search Maps"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </SearchWrap>

        <SectionLabel>Favorites</SectionLabel>
        <PlaceList>
          {FAVORITES.map((place) => (
            <PlaceItem
              key={place.name}
              type="button"
              active={
                activePlace.lat === place.lat && activePlace.lon === place.lon
              }
              onClick={() => selectPlace(place)}
            >
              <PlaceIcon>⭐</PlaceIcon>
              <PlaceInfo>
                <strong>{place.name}</strong>
                <span>{place.country}</span>
              </PlaceInfo>
            </PlaceItem>
          ))}
        </PlaceList>

        {results.length > 0 && (
          <>
            <SectionLabel>Results</SectionLabel>
            <PlaceList>
              {results.map((place, i) => (
                <PlaceItem
                  key={`${place.lat}-${i}`}
                  type="button"
                  onClick={() => selectPlace(place)}
                >
                  <PlaceIcon>📍</PlaceIcon>
                  <PlaceInfo>
                    <strong>{place.name}</strong>
                    <span>{place.subtitle}</span>
                  </PlaceInfo>
                </PlaceItem>
              ))}
            </PlaceList>
          </>
        )}

        {recents.length > 0 && (
          <>
            <SectionLabel>Recents</SectionLabel>
            <PlaceList>
              {recents.map((place) => (
                <PlaceItem
                  key={`${place.lat}-${place.name}`}
                  type="button"
                  active={
                    activePlace.lat === place.lat && activePlace.lon === place.lon
                  }
                  onClick={() => selectPlace(place)}
                >
                  <PlaceIcon>🕐</PlaceIcon>
                  <PlaceInfo>
                    <strong>{place.name}</strong>
                    <span>{place.country || 'Recent'}</span>
                  </PlaceInfo>
                </PlaceItem>
              ))}
            </PlaceList>
          </>
        )}
      </Sidebar>

      <MapMain>
        {loading && <LoadingOverlay>Searching…</LoadingOverlay>}
        <MapFrame key={mapUrl} src={mapUrl} title="Map" />
        <MapControls>
          <MapButton type="button" onClick={zoomIn} title="Zoom in">
            +
          </MapButton>
          <MapButton type="button" onClick={zoomOut} title="Zoom out">
            −
          </MapButton>
          <MapButton
            type="button"
            title="My location"
            onClick={() => selectPlace(DEFAULT_PLACE)}
          >
            <FaLocationArrow size={14} />
          </MapButton>
        </MapControls>
        <InfoCard>
          <InfoTitle>{activePlace.name}</InfoTitle>
          <InfoMeta>
            {activePlace.lat.toFixed(4)}°, {activePlace.lon.toFixed(4)}°
            {activePlace.country ? ` · ${activePlace.country}` : ''}
          </InfoMeta>
          {directionsHint && (
            <InfoMeta style={{ color: '#007aff', marginBottom: 8 }}>
              {directionsHint}
            </InfoMeta>
          )}
          <InfoActions>
            <ActionButton
              type="button"
              primary
              onClick={() =>
                setDirectionsHint(`Directions to ${activePlace.name} — demo route ready`)
              }
            >
              <FaDirections size={12} />
              Directions
            </ActionButton>
            <ActionButton
              type="button"
              onClick={() => selectPlace(activePlace)}
            >
              <FaStar size={12} />
              Save
            </ActionButton>
          </InfoActions>
        </InfoCard>
      </MapMain>
    </Container>
  );
}

export default Maps;