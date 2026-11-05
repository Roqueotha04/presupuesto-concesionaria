export type StarDensity = "sparse" | "dense";

export interface Star {
  x: number;
  y: number;
  depth: number;
  radius: number;
  phase: number;
  tone: number;
}

export interface StarPalette {
  base: string;
  primary: string;
  accent: string;
}

export interface PointerState {
  x: number;
  y: number;
  active: boolean;
}

const AREA_PER_STAR: Record<StarDensity, number> = { sparse: 9000, dense: 2600 };
const MAX_STARS = 320;
const LINK_RADIUS = 150;
const LINK_DISTANCE = 90;
const PARALLAX_STRENGTH = 26;
const WARP_DURATION_MS = 1800;

export function starCountFor(width: number, height: number, density: StarDensity): number {
  return Math.min(MAX_STARS, Math.round((width * height) / AREA_PER_STAR[density]));
}

export function createStars(count: number, width: number, height: number): Star[] {
  return Array.from({ length: count }, () => {
    const depth = Math.random() ** 1.6;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      depth,
      radius: 0.4 + depth * 1.4,
      phase: Math.random() * Math.PI * 2,
      tone: Math.random(),
    };
  });
}

export function readPalette(element: Element): StarPalette {
  const styles = getComputedStyle(element);
  return {
    base: styles.getPropertyValue("--foreground").trim(),
    primary: styles.getPropertyValue("--primary").trim(),
    accent: styles.getPropertyValue("--accent").trim(),
  };
}

function colorFor(star: Star, palette: StarPalette): string {
  if (star.tone > 0.93) return palette.accent;
  if (star.tone > 0.8) return palette.primary;
  return palette.base;
}

export function driftStars(stars: Star[], height: number): void {
  for (const star of stars) {
    star.y -= 0.03 + star.depth * 0.12;
    if (star.y < -4) star.y = height + 4;
  }
}

export function warpStrength(warpStart: number | null, now: number): number {
  if (warpStart === null) return 0;
  const progress = Math.min(1, (now - warpStart) / WARP_DURATION_MS);
  return (1 - progress) ** 3;
}

interface DrawOptions {
  context: CanvasRenderingContext2D;
  stars: Star[];
  width: number;
  height: number;
  palette: StarPalette;
  pointer: PointerState;
  time: number;
  warp: number;
}

function projectedPosition(star: Star, options: DrawOptions) {
  const { width, height, pointer } = options;
  const offsetX = pointer.active ? (pointer.x / width - 0.5) * PARALLAX_STRENGTH : 0;
  const offsetY = pointer.active ? (pointer.y / height - 0.5) * PARALLAX_STRENGTH : 0;
  return { x: star.x - offsetX * star.depth, y: star.y - offsetY * star.depth };
}

function drawStar(star: Star, x: number, y: number, options: DrawOptions) {
  const { context, palette, time, warp, width, height } = options;
  const twinkle = 0.6 + 0.4 * Math.sin(time * 0.0012 * (0.5 + star.depth) + star.phase);
  context.globalAlpha = Math.min(1, (0.25 + star.depth * 0.75) * twinkle);
  const color = colorFor(star, palette);

  if (warp > 0.01) {
    const trailX = (x - width / 2) * warp * 0.35 * star.depth;
    const trailY = (y - height / 2) * warp * 0.35 * star.depth;
    context.strokeStyle = color;
    context.lineWidth = star.radius;
    context.beginPath();
    context.moveTo(x - trailX, y - trailY);
    context.lineTo(x, y);
    context.stroke();
    return;
  }

  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, star.radius, 0, Math.PI * 2);
  context.fill();
}

function drawPointerLinks(points: { x: number; y: number }[], options: DrawOptions) {
  const { context, palette, pointer } = options;
  const nearby = points.filter(
    (point) => Math.hypot(point.x - pointer.x, point.y - pointer.y) < LINK_RADIUS,
  );

  context.strokeStyle = palette.accent;
  context.lineWidth = 0.6;

  for (let first = 0; first < nearby.length; first++) {
    for (let second = first + 1; second < nearby.length; second++) {
      const distance = Math.hypot(
        nearby[first].x - nearby[second].x,
        nearby[first].y - nearby[second].y,
      );
      if (distance > LINK_DISTANCE) continue;
      context.globalAlpha = (1 - distance / LINK_DISTANCE) * 0.45;
      context.beginPath();
      context.moveTo(nearby[first].x, nearby[first].y);
      context.lineTo(nearby[second].x, nearby[second].y);
      context.stroke();
    }
  }
}

export function drawFrame(options: DrawOptions): void {
  const { context, stars, width, height, pointer } = options;
  context.clearRect(0, 0, width, height);

  const points = stars.map((star) => {
    const position = projectedPosition(star, options);
    drawStar(star, position.x, position.y, options);
    return position;
  });

  if (pointer.active && options.warp < 0.01) drawPointerLinks(points, options);
  context.globalAlpha = 1;
}
