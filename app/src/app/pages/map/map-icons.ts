const vesselSvg =  `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <polygon points="32,4 52,52 32,44 12,52" fill="#0077cc" stroke="white" stroke-width="2"/>
</svg>`;

const carSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect x="18" y="10" width="28" height="44" rx="6" fill="#cc3300" stroke="white" stroke-width="2"/>
  <circle cx="20" cy="16" r="4" fill="#222"/>
  <circle cx="44" cy="16" r="4" fill="#222"/>
  <circle cx="20" cy="48" r="4" fill="#222"/>
  <circle cx="44" cy="48" r="4" fill="#222"/>
</svg>`;

const busSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect x="12" y="8" width="40" height="48" rx="4" fill="#ffaa00" stroke="white" stroke-width="2"/>
  <rect x="17" y="14" width="10" height="8" rx="2" fill="white" opacity="0.8"/>
  <rect x="37" y="14" width="10" height="8" rx="2" fill="white" opacity="0.8"/>
  <rect x="17" y="28" width="10" height="8" rx="2" fill="white" opacity="0.8"/>
  <rect x="37" y="28" width="10" height="8" rx="2" fill="white" opacity="0.8"/>
  <rect x="17" y="42" width="10" height="8" rx="2" fill="white" opacity="0.8"/>
  <rect x="37" y="42" width="10" height="8" rx="2" fill="white" opacity="0.8"/>
</svg>`;

function svgToDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const MAP_ICONS: Record<string, string> = {
  vessel: svgToDataUrl(vesselSvg),
  car: svgToDataUrl(carSvg),
  bus: svgToDataUrl(busSvg)
}
