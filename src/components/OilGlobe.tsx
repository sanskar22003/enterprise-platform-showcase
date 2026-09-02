import { Theme } from '../App';
import { GlobeCdn } from './ui/cobe-globe-cdn';

interface Props { theme: Theme; }

const OIL_FIELDS = [
  { id: '1', lat: 24.5, lng: 54.5, name: 'Abu Dhabi Offshore' },
  { id: '2', lat: 26.0, lng: 50.5, name: 'Persian Gulf' },
  { id: '3', lat: 29.0, lng: 48.0, name: 'Kuwait Offshore' },
  { id: '4', lat: 22.0, lng: 59.0, name: 'Arabian Sea' },
  { id: '5', lat: 57.5, lng: 2.0, name: 'North Sea' },
  { id: '6', lat: 51.0, lng: 3.5, name: 'North Sea East' },
  { id: '7', lat: 29.0, lng: -89.5, name: 'Gulf of Mexico' },
  { id: '8', lat: 26.5, lng: -91.0, name: 'GOM Deep Water' },
  { id: '9', lat: 40.5, lng: 50.5, name: 'Caspian Sea' },
  { id: '10', lat: 1.5, lng: 106.0, name: 'South China Sea' },
  { id: '11', lat: 5.0, lng: 4.0, name: 'Gulf of Guinea' },
  { id: '12', lat: -15.0, lng: 12.0, name: 'Angola Offshore' },
];

const ARCS = [
  { id: 'a1', from: [24.5, 54.5], to: [26.0, 50.5] },
  { id: 'a2', from: [24.5, 54.5], to: [29.0, 48.0] },
  { id: 'a3', from: [24.5, 54.5], to: [22.0, 59.0] },
  { id: 'a4', from: [26.0, 50.5], to: [40.5, 50.5] },
  { id: 'a5', from: [22.0, 59.0], to: [1.5, 106.0] },
  { id: 'a6', from: [57.5, 2.0], to: [51.0, 3.5] },
  { id: 'a7', from: [57.5, 2.0], to: [24.5, 54.5] },
  { id: 'a8', from: [29.0, -89.5], to: [26.5, -91.0] },
  { id: 'a9', from: [29.0, -89.5], to: [57.5, 2.0] },
  { id: 'a10', from: [40.5, 50.5], to: [24.5, 54.5] },
  { id: 'a11', from: [1.5, 106.0], to: [5.0, 4.0] },
  { id: 'a12', from: [5.0, 4.0], to: [-15.0, 12.0] },
  { id: 'a13', from: [51.0, 3.5], to: [29.0, -89.5] },
  { id: 'a14', from: [29.0, 48.0], to: [26.0, 50.5] },
  { id: 'a15', from: [22.0, 59.0], to: [24.5, 54.5] },
];

export default function OilGlobe({ theme }: Props) {
  return (
    <div className='w-full h-full flex items-center justify-end relative right-[-15%] xl:right-[-25%] overflow-visible'>
      <GlobeCdn
        className='w-[900px] h-[900px] xl:w-[1100px] xl:h-[1100px] max-w-none max-h-none flex-shrink-0'
        markers={OIL_FIELDS.map(f => ({ id: f.id, location: [f.lat, f.lng], region: f.name }))}
        arcs={ARCS.map(a => ({ id: a.id, from: a.from as [number, number], to: a.to as [number, number] }))}
        isDark={theme === 'dark'}
        speed={0.002}
      />
    </div>
  );
}