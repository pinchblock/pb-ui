import {
  Label,
  SegmentedControl,
  SegmentedControlItem,
  Slider,
} from "@pinchblock/ui";
import { useEffect, useState, type CSSProperties } from "react";

import masterUrl from "../../../../assets/1024.png";
import { PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx";

/**
 * Brand artwork constants. These describe the icon itself, not a theme:
 * the launcher PNGs bake the same gradient, so they stay literal here on
 * purpose and never become semantic tokens. Swap the accent by editing
 * this one object.
 */
const ICON = {
  /* Background gradients per environment, top to bottom. Production is the
   * brand cyan; beta and dev get their own colour so a tester can never
   * mistake one build for another. */
  gradients: {
    production: ["#2DFFF1", "#0096F4"],
    beta: ["#FFE95C", "#FFD21F"],
    dev: ["#FF8FDC", "#FF4FC3"],
  },
  /* Header squircle from the landing design, objectBoundingBox units. */
  squirclePath:
    "M1 .5C1 .086 .914 0 .5 0 .086 0 0 .086 0 .5c0 .414 .086 .5 .5 .5 .414 0 .5-.086 .5-.5Z",
  /* Master is 1024 square; the fully opaque object (no shadow) sits here. */
  master: 1024,
  object: { left: 148, top: 212, width: 728, height: 598 },
  /* Launcher framing used by the generator in pb-app. */
  squareFill: 0.75,
  adaptiveFill: (66 / 108) * 0.9,
};

type Shape = "square" | "squircle" | "ios" | "circle" | "rounded";
type Environment = "production" | "beta" | "dev";

const SHAPE_STYLE: Record<Shape, CSSProperties> = {
  square: {},
  squircle: { clipPath: "url(#brand-icon-squircle)" },
  /* Apple's continuous corner, close enough for review. */
  ios: { borderRadius: "22.37%" },
  circle: { borderRadius: "50%" },
  rounded: { borderRadius: "20%" },
};

/** Places the master so its solid object spans `fill` of a `size` box. */
function objectPlacement(size: number, fill: number): CSSProperties {
  const scale = (size * fill) / ICON.object.width;
  const imageSize = ICON.master * scale;
  const centerX = (ICON.object.left + ICON.object.width / 2) * scale;
  const centerY = (ICON.object.top + ICON.object.height / 2) * scale;
  return {
    position: "absolute",
    width: imageSize,
    height: imageSize,
    left: size / 2 - centerX,
    top: size / 2 - centerY,
    maxWidth: "none",
  };
}

function gradientStyle(environment: Environment): CSSProperties {
  const [top, bottom] = ICON.gradients[environment];
  return { backgroundImage: `linear-gradient(to bottom, ${top}, ${bottom})` };
}

/** One composed icon: environment gradient, placed master, launcher mask. */
function IconTile({
  size,
  fill = ICON.squareFill,
  shape = "square",
  environment = "production",
}: {
  size: number;
  fill?: number;
  shape?: Shape;
  environment?: Environment;
}) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        ...gradientStyle(environment),
        ...SHAPE_STYLE[shape],
      }}
    >
      <img alt="" src={masterUrl} style={objectPlacement(size, fill)} />
    </span>
  );
}

/** Object-only silhouette from the master's fully opaque pixels, like the
 * generated Android monochrome layer. Rendered once through a canvas. */
function useSilhouette(): string | null {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = pixels;
      for (let index = 0; index < data.length; index += 4) {
        const solid = data[index + 3] === 255;
        data[index] = 0;
        data[index + 1] = 0;
        data[index + 2] = 0;
        data[index + 3] = solid ? 255 : 0;
      }
      context.putImageData(pixels, 0, 0);
      setUrl(canvas.toDataURL("image/png"));
    };
    image.src = masterUrl;
  }, []);
  return url;
}

function MonochromeTile({
  size,
  silhouette,
}: {
  size: number;
  silhouette: string;
}) {
  const placement = objectPlacement(size, ICON.adaptiveFill);
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full bg-muted"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute bg-foreground"
        style={{
          ...placement,
          maskImage: `url(${silhouette})`,
          maskSize: "100% 100%",
          WebkitMaskImage: `url(${silhouette})`,
          WebkitMaskSize: "100% 100%",
        }}
      />
    </span>
  );
}

const SIZES = [512, 192, 96, 64, 48, 32, 16];

export default function BrandIconPage() {
  const [fill, setFill] = useState(ICON.squareFill);
  const [environment, setEnvironment] = useState<Environment>("production");
  const silhouette = useSilhouette();

  return (
    <div>
      {/* Shared clip path for every squircle tile on the page. */}
      <svg aria-hidden className="absolute size-0">
        <defs>
          <clipPath id="brand-icon-squircle" clipPathUnits="objectBoundingBox">
            <path d={ICON.squirclePath} />
          </clipPath>
        </defs>
      </svg>

      <PageIntro
        title="App icon"
        description="The dumbbell mark from assets/1024.png composed the way every launcher, favicon and header sees it. The framing constants match the generator in pb-app, so what looks right here is what ships."
        use="Review the mark at real sizes and under every launcher mask before regenerating the platform set. Theme, mode and density knobs above change the surroundings only; the icon itself never follows the theme."
      />

      <Showcase
        title="Framing"
        hint="Fill is the solid object's width as a share of the square. 0.75 is the current launcher framing; Android adaptive layers use a smaller fill so masks never cut the mark. Beta and dev builds keep the mark and swap the background."
      >
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="grid gap-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label>Fill</Label>
                <span className="text-sm font-semibold text-primary tabular-nums">
                  {fill.toFixed(2)}
                </span>
              </div>
              <Slider
                aria-label="Fill"
                min={0.5}
                max={1}
                step={0.01}
                value={fill}
                onValueChange={(value) => setFill(value as number)}
              />
            </div>
            <div>
              <Label className="mb-2 block">Environment</Label>
              <SegmentedControl
                size="sm"
                value={environment}
                onValueChange={(value) => setEnvironment(value as Environment)}
                aria-label="Environment"
              >
                <SegmentedControlItem value="production">Production</SegmentedControlItem>
                <SegmentedControlItem value="beta">Beta</SegmentedControlItem>
                <SegmentedControlItem value="dev">Dev</SegmentedControlItem>
              </SegmentedControl>
            </div>
          </div>
          <IconTile size={256} fill={fill} shape="squircle" environment={environment} />
        </div>
      </Showcase>

      <Showcase
        title="Sizes"
        hint="Squircle at every size the web and dashboard use, down to the 16px tab favicon."
      >
        <div className="flex flex-wrap items-end gap-6">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <IconTile size={size} fill={fill} shape="squircle" environment={environment} />
              <span className="text-xs text-muted-foreground tabular-nums">
                {size}
              </span>
            </div>
          ))}
        </div>
      </Showcase>

      <Showcase
        title="Launcher masks"
        hint="iOS masks the opaque 1024 icon itself. Android composes the adaptive foreground over the gradient background and applies the launcher's mask; the ring marks the 66/108 safe zone."
      >
        <VariantRow>
          <div className="flex flex-col items-center gap-2">
            <IconTile size={96} fill={fill} shape="ios" environment={environment} />
            <span className="text-xs text-muted-foreground">iOS</span>
          </div>
          {(["circle", "squircle", "rounded"] as const).map((shape) => (
            <div key={shape} className="flex flex-col items-center gap-2">
              <span className="relative">
                <IconTile
                  size={96}
                  fill={ICON.adaptiveFill}
                  shape={shape}
                  environment={environment}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute rounded-full border border-destructive/60"
                  style={{
                    inset: `${((1 - 66 / 108) / 2) * 100}%`,
                  }}
                />
              </span>
              <span className="text-xs text-muted-foreground">
                Android {shape}
              </span>
            </div>
          ))}
        </VariantRow>
      </Showcase>

      <Showcase
        title="Monochrome"
        hint="Silhouette of the fully opaque pixels only, as Android themed icons and the notification icon use it. Follows the foreground token so it reads in both modes."
      >
        <VariantRow>
          {silhouette
            ? [96, 48, 24].map((size) => (
                <MonochromeTile key={size} size={size} silhouette={silhouette} />
              ))
            : null}
        </VariantRow>
      </Showcase>

      <Showcase
        title="Header lockup"
        hint="48px squircle beside the wordmark, light and dark, as the landing header and app shell render it."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {(["light", "dark"] as const).map((mode) => (
            <div
              key={mode}
              className={`${mode === "dark" ? "dark" : ""} flex items-center gap-3 rounded-lg border border-border bg-background p-4 text-lg font-semibold text-foreground`}
            >
              <IconTile size={48} fill={fill} shape="squircle" environment={environment} />
              Pinchblock
            </div>
          ))}
        </div>
      </Showcase>

      <Showcase
        title="Master render"
        hint="assets/1024.png as delivered: 1024 square, transparent background, floor shadow in the alpha channel."
      >
        <img
          alt="Dumbbell mark master render"
          src={masterUrl}
          className="size-64 rounded-lg bg-background-sunken"
        />
      </Showcase>
    </div>
  );
}
