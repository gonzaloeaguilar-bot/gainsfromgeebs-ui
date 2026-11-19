"use client";

import { useEffect, useState } from "react";

export const MONTH_SCENES = [
  {
    slug: "january",
    label: "JANUARY",
    wall: "#15334b",
    glow: "#9bd8ff",
    accent: "#dff5ff",
  },
  {
    slug: "february",
    label: "FEBRUARY",
    wall: "#4a243d",
    glow: "#ff7fa8",
    accent: "#ffd0df",
  },
  {
    slug: "march",
    label: "MARCH",
    wall: "#183f35",
    glow: "#64cf78",
    accent: "#c9f5b7",
  },
  {
    slug: "april",
    label: "APRIL",
    wall: "#263c55",
    glow: "#78bfff",
    accent: "#d5efff",
  },
  {
    slug: "may",
    label: "MAY",
    wall: "#25463d",
    glow: "#f29cc2",
    accent: "#d8f2b0",
  },
  {
    slug: "june",
    label: "JUNE",
    wall: "#17465b",
    glow: "#ffd66b",
    accent: "#8fe5e2",
  },
  {
    slug: "july",
    label: "JULY",
    wall: "#263b5d",
    glow: "#ef4f5f",
    accent: "#f4f1df",
  },
  {
    slug: "august",
    label: "AUGUST",
    wall: "#3e4934",
    glow: "#ffb44d",
    accent: "#ffe49a",
  },
  {
    slug: "september",
    label: "SEPTEMBER",
    wall: "#3f3b31",
    glow: "#d9a441",
    accent: "#f1dfae",
  },
  {
    slug: "october",
    label: "OCTOBER",
    wall: "#2c2440",
    glow: "#aa6be8",
    accent: "#ed742f",
  },
  {
    slug: "november",
    label: "NOVEMBER",
    wall: "#493124",
    glow: "#d9893d",
    accent: "#f2c06b",
  },
  {
    slug: "december",
    label: "DECEMBER",
    wall: "#173c38",
    glow: "#df3f4d",
    accent: "#f5e9c6",
  },
] as const;

export type SceneMonth = (typeof MONTH_SCENES)[number]["slug"];
type GymTimeOfDay = "day" | "night";

export function monthScene(monthIndex: number) {
  return MONTH_SCENES[Math.max(0, Math.min(11, monthIndex))];
}

export function gymTimeOfDay(date = new Date()): GymTimeOfDay {
  const hour = date.getHours();
  return hour >= 7 && hour < 19 ? "day" : "night";
}

function PixelHeart({
  x,
  y,
  color = "#ff7fa8",
}: {
  x: number;
  y: number;
  color?: string;
}) {
  return (
    <path
      d={`M${x} ${y + 4}h4v-4h8v4h4v-4h8v4h4v8h-4v4h-4v4h-4v4h-4v-4h-4v-4h-4v-4h-4Z`}
      fill={color}
    />
  );
}

function PixelLeaf({ x, y, color }: { x: number; y: number; color: string }) {
  return <path d={`M${x} ${y}h8v4h4v8h-4v4h-8v-4h-4v-8h4Z`} fill={color} />;
}

function PixelGymEquipment({ accent }: { accent: string }) {
  return (
    <g data-pixel-gym-equipment="true">
      {/* Clean SNES squat rack: readable, heroic, and not fighting Kris. */}
      <g transform="translate(42 218)">
        <rect x="0" y="0" width="168" height="14" fill="#10181b" />
        <rect x="0" y="0" width="168" height="4" fill="#304144" />
        <rect x="10" y="14" width="14" height="250" fill="#111a1d" />
        <rect x="13" y="20" width="4" height="238" fill="#314145" />
        <rect x="144" y="14" width="14" height="250" fill="#111a1d" />
        <rect x="147" y="20" width="4" height="238" fill="#314145" />
        <rect x="24" y="44" width="120" height="10" fill="#aeb9b8" />
        <rect x="24" y="44" width="120" height="3" fill="#e3ece9" />
        <rect x="24" y="118" width="120" height="8" fill="#2d3a3d" />
        {[42, 76, 110, 144, 178, 212].map((y) => (
          <g key={y} fill="#d9e0de">
            <rect x="14" y={y} width="6" height="6" />
            <rect x="148" y={y} width="6" height="6" />
          </g>
        ))}
        <rect x="-8" y="50" width="18" height="34" fill="#84212d" />
        <rect x="158" y="50" width="18" height="34" fill="#84212d" />
        <rect x="-16" y="56" width="8" height="22" fill="#e15449" />
        <rect x="176" y="56" width="8" height="22" fill="#e15449" />
        <rect x="-4" y="56" width="6" height="20" fill="#b3343c" />
        <rect x="164" y="56" width="6" height="20" fill="#b3343c" />
        <rect x="30" y="230" width="108" height="14" fill="#243133" />
        <rect x="42" y="224" width="84" height="8" fill="#334547" />
        <rect x="44" y="244" width="10" height="34" fill="#101719" />
        <rect x="114" y="244" width="10" height="34" fill="#101719" />
      </g>

      {/* Right-side cable station, quiet enough to sit behind the chat chips. */}
      <g
        transform="translate(304 232)"
        opacity=".88"
        data-gym-detail="cable-stack"
      >
        <rect width="48" height="168" rx="2" fill="#0d1416" />
        <rect x="4" y="4" width="40" height="4" fill="#435459" />
        <rect x="8" y="10" width="32" height="112" fill="#223034" />
        <rect x="13" y="20" width="14" height="82" fill="#334247" />
        <rect
          x="16"
          y="20"
          width="4"
          height="82"
          fill="#5f7378"
          opacity=".35"
        />
        {[24, 40, 56, 72, 88, 104].map((y, index) => (
          <text
            key={y}
            x="31"
            y={y}
            fill="#cbd4d1"
            fontFamily="monospace"
            fontSize="7"
            fontWeight="900"
          >
            {28 - index}
          </text>
        ))}
        <rect x="26" y="8" width="3" height="116" fill="#b7c1bf" />
        <path
          d="M28 8C58 40 58 68 38 92"
          fill="none"
          stroke="#d5dddd"
          strokeWidth="2"
          opacity=".75"
        />
        <rect x="10" y="132" width="28" height="7" fill={accent} />
        <rect x="17" y="148" width="16" height="18" fill="#090d0e" />
        <rect x="-8" y="76" width="14" height="7" fill="#c8d0cf" />
        <rect x="42" y="76" width="14" height="7" fill="#c8d0cf" />
      </g>

      {/* Background cardio/machine silhouettes: enough depth, not noise. */}
      <g transform="translate(210 184)" opacity=".58">
        {[0, 44, 88].map((x) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <rect x="18" y="24" width="8" height="72" fill="#607073" />
            <rect x="36" y="16" width="10" height="80" fill="#7c8989" />
            <rect x="8" y="88" width="48" height="8" fill="#151c1e" />
            <rect x="10" y="54" width="40" height="26" fill="#1d282b" />
            <rect x="4" y="78" width="14" height="14" fill="#2a3335" />
            <rect x="46" y="78" width="14" height="14" fill="#2a3335" />
          </g>
        ))}
      </g>

      {/* Dumbbell rack: clear silhouette, tucked behind messages. */}
      <g
        transform="translate(232 404)"
        opacity=".82"
        data-gym-detail="dumbbell-rack"
      >
        <rect x="0" y="18" width="134" height="12" fill="#111719" />
        <rect x="4" y="18" width="126" height="3" fill="#37474a" />
        <rect x="8" y="70" width="126" height="12" fill="#111719" />
        <rect x="12" y="70" width="118" height="3" fill="#2f3c3f" />
        <rect x="14" y="30" width="8" height="78" fill="#263437" />
        <rect x="116" y="30" width="8" height="78" fill="#263437" />
        {[12, 42, 72, 102].map((x, index) => (
          <g key={x} transform={`translate(${x} ${index % 2 ? 35 : 30})`}>
            <rect x="8" y="5" width="16" height="7" fill="#aeb9b8" />
            <rect width="10" height="18" rx="1.5" fill="#30383a" />
            <rect x="24" width="10" height="18" rx="1.5" fill="#30383a" />
            <text
              x="4"
              y="13"
              fill="#bfc9c7"
              fontSize="5"
              fontFamily="monospace"
              fontWeight="900"
            >
              {20 + index * 10}
            </text>
            <rect x="8" y="38" width="16" height="7" fill="#879291" />
            <rect y="34" width="10" height="18" rx="1.5" fill="#20282a" />
            <rect
              x="24"
              y="34"
              width="10"
              height="18"
              rx="1.5"
              fill="#20282a"
            />
          </g>
        ))}
      </g>

      {/* Small plate tree, far enough back that Kris stays the focus. */}
      <g transform="translate(22 410)" opacity=".76">
        <rect x="28" width="8" height="96" fill="#819090" />
        <rect x="31" width="3" height="92" fill="#d0d9d6" />
        <rect x="8" y="88" width="48" height="10" fill="#111719" />
        <rect x="8" y="20" width="42" height="8" fill="#819090" />
        <rect x="2" y="13" width="14" height="22" fill={accent} />
        <rect x="46" y="12" width="14" height="24" fill="#2d3436" />
        <rect x="10" y="56" width="38" height="8" fill="#819090" />
        <rect x="4" y="50" width="12" height="22" fill="#e15449" />
        <rect x="44" y="50" width="12" height="22" fill="#4977a4" />
      </g>
    </g>
  );
}

function MonthDecor({ month }: { month: SceneMonth }) {
  if (month === "january")
    return (
      <g className="pixel-gym-fall">
        {[42, 116, 202, 286, 344].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={80 + i * 19}
            width="5"
            height="5"
            fill="#dff5ff"
          />
        ))}
      </g>
    );
  if (month === "february")
    return (
      <g className="pixel-gym-bob">
        <PixelHeart x={42} y={88} />
        <PixelHeart x={318} y={138} color="#ffd0df" />
      </g>
    );
  if (month === "march")
    return (
      <g className="pixel-gym-bob" fill="#65d16f">
        <path d="M48 94h8v-8h8v8h8v8h-8v8h-8v-8h-8Z" />
        <path d="M316 126h8v-8h8v8h8v8h-8v8h-8v-8h-8Z" />
      </g>
    );
  if (month === "april")
    return (
      <g className="pixel-gym-rain" fill="#78bfff">
        {[42, 72, 108, 278, 318, 350].map((x, i) => (
          <path key={x} d={`M${x} ${76 + i * 12}h4v12h-4Z`} />
        ))}
      </g>
    );
  if (month === "may")
    return (
      <g className="pixel-gym-bob">
        <g transform="translate(48 104)">
          <rect x="6" y="8" width="4" height="22" fill="#5c9e55" />
          <rect width="10" height="10" fill="#f29cc2" />
          <rect x="8" width="10" height="10" fill="#f7d86e" />
        </g>
        <g transform="translate(320 136)">
          <rect x="6" y="8" width="4" height="22" fill="#5c9e55" />
          <rect width="10" height="10" fill="#d8f2b0" />
        </g>
      </g>
    );
  if (month === "june")
    return (
      <g className="pixel-gym-pulse">
        <rect x="322" y="92" width="34" height="34" fill="#ffd66b" />
        <rect x="330" y="100" width="18" height="18" fill="#ffe9a8" />
        <rect x="46" y="120" width="12" height="34" fill="#55c7d1" />
        <rect x="49" y="114" width="6" height="8" fill="#dffcff" />
      </g>
    );
  if (month === "july")
    return (
      <g>
        <g className="pixel-gym-pulse" stroke="#f4f1df" strokeWidth="4">
          <path d="M326 88v42M306 108h40M312 94l28 28M340 94l-28 28" />
        </g>
        <path d="M38 88h42v8H38zm0 16h42v8H38zm0 16h42v8H38" fill="#ef4f5f" />
        <rect x="38" y="88" width="17" height="16" fill="#315a91" />
      </g>
    );
  if (month === "august")
    return (
      <g>
        <g className="pixel-gym-spin" transform="translate(330 112)">
          <rect x="-4" y="-34" width="8" height="30" fill="#ffb44d" />
          <rect x="4" y="-4" width="30" height="8" fill="#ffe49a" />
          <rect x="-4" y="4" width="8" height="30" fill="#ffb44d" />
          <rect x="-34" y="-4" width="30" height="8" fill="#ffe49a" />
          <rect x="-6" y="-6" width="12" height="12" fill="#783f24" />
        </g>
      </g>
    );
  if (month === "september")
    return (
      <g className="pixel-gym-fall">
        <PixelLeaf x={44} y={96} color="#d9a441" />
        <PixelLeaf x={320} y={138} color="#b45d36" />
      </g>
    );
  if (month === "october")
    return (
      <g>
        <g className="pixel-gym-bat" fill="#101018">
          <path d="M35 88h12v-6h8v6h12v6h-8v6h-4v-6h-4v6h-4v-6h-12Z" />
          <path d="M302 126h10v-5h7v5h10v5h-7v5h-3v-5h-4v5h-3v-5h-10Z" />
        </g>
        <g
          className="pixel-gym-pulse"
          transform="translate(300 342)"
          data-gym-detail="october-pumpkin"
        >
          <path
            d="M24 4c3-8 12-6 12 2-6 1-9 4-10 10h-6c1-5 2-9 4-12Z"
            fill="#34572c"
          />
          <path
            d="M16 16c-10 2-16 12-16 25 0 17 12 26 28 26s28-9 28-26c0-13-6-23-16-25-6-5-18-5-24 0Z"
            fill="#5f2117"
          />
          <path
            d="M8 25c0-9 7-15 16-16 8 4 11 16 11 30 0 12-4 23-11 28C14 65 8 56 8 42Z"
            fill="#c94721"
          />
          <path
            d="M22 14c8-4 20 1 24 13 4 12 1 28-8 36-7 5-15 5-20 1 11-11 12-37 4-50Z"
            fill="#f07d2e"
          />
          <path
            d="M25 16c4-2 9 0 12 5 2 11 1 27-2 38-3 4-7 6-11 5 6-13 7-35 1-48Z"
            fill="#ff9c3a"
            opacity=".62"
          />
          <path
            d="M12 36h10l-5 7Zm30 0H32l5 7Zm-24 18c8 6 20 6 28 0v7H18Z"
            fill="#1d120e"
          />
          <path d="M19 55h6v5h-6Zm12 2h6v5h-6Z" fill="#ffd25a" opacity=".75" />
          <ellipse
            cx="28"
            cy="69"
            rx="30"
            ry="5"
            fill="#110c0a"
            opacity=".28"
          />
        </g>
      </g>
    );
  if (month === "november")
    return (
      <g>
        <g className="pixel-gym-bob" transform="translate(300 414)">
          <rect x="18" y="10" width="26" height="32" fill="#6b3520" />
          <rect x="23" y="5" width="16" height="12" fill="#a85c2b" />
          <rect x="28" y="0" width="6" height="7" fill="#4f2a1b" />
          <rect x="8" y="20" width="16" height="28" fill="#c77535" />
          <rect x="38" y="20" width="16" height="28" fill="#d9893d" />
          <rect x="0" y="24" width="14" height="22" fill="#8c4a2b" />
          <rect x="52" y="24" width="14" height="22" fill="#8c4a2b" />
          <rect x="25" y="22" width="5" height="5" fill="#21130d" />
          <rect x="36" y="22" width="5" height="5" fill="#21130d" />
          <rect x="31" y="30" width="5" height="7" fill="#e1a63f" />
          <rect x="26" y="39" width="16" height="5" fill="#4f2a1b" />
        </g>
        <g className="pixel-gym-fall">
          <PixelLeaf x={46} y={100} color="#d9893d" />
          <PixelLeaf x={336} y={120} color="#f2c06b" />
          <PixelLeaf x={280} y={350} color="#b45d36" />
        </g>
      </g>
    );
  return (
    <g>
      <g className="pixel-gym-light">
        <rect x="48" y="82" width="8" height="8" fill="#df3f4d" />
        <rect x="84" y="82" width="8" height="8" fill="#f5d86e" />
        <rect x="120" y="82" width="8" height="8" fill="#68c49a" />
        <rect x="156" y="82" width="8" height="8" fill="#df3f4d" />
        <rect x="192" y="82" width="8" height="8" fill="#f5d86e" />
        <rect x="228" y="82" width="8" height="8" fill="#68c49a" />
        <rect x="264" y="82" width="8" height="8" fill="#df3f4d" />
        <rect x="300" y="82" width="8" height="8" fill="#f5d86e" />
      </g>
      <g transform="translate(302 320)">
        <path d="M20 0 0 42h40Z" fill="#1f6c4d" />
        <path d="M20 13 6 50h28Z" fill="#39a66c" />
        <path d="M20 25 10 58h20Z" fill="#52bd7f" />
        <rect x="16" y="47" width="8" height="16" fill="#75442c" />
        <rect x="8" y="58" width="16" height="14" fill="#df3f4d" />
        <rect x="24" y="55" width="14" height="17" fill="#f5d86e" />
        <rect x="12" y="62" width="6" height="5" fill="#f8c8c8" />
        <rect x="28" y="59" width="5" height="5" fill="#fff5b5" />
      </g>
    </g>
  );
}

function WindowPane({
  x,
  timeOfDay,
  variant = 0,
}: {
  x: number;
  timeOfDay: GymTimeOfDay;
  variant?: number;
}) {
  const isNight = timeOfDay === "night";

  return (
    <g transform={`translate(${x} 0)`} data-gym-window-time={timeOfDay}>
      <rect width="92" height="96" fill={isNight ? "#15283f" : "#7eb9c2"} />
      <rect
        width="92"
        height="34"
        fill={isNight ? "#20395a" : "#a7d7d8"}
        opacity={isNight ? ".65" : ".5"}
      />
      {isNight ? (
        <g>
          <rect
            x={variant ? 60 : 66}
            y="16"
            width="18"
            height="18"
            fill="#f4e7a5"
          />
          <rect
            x={variant ? 54 : 60}
            y="14"
            width="14"
            height="18"
            fill="#20395a"
          />
          {[14, 34, 48, 78].map((starX, index) => (
            <rect
              key={starX}
              x={starX}
              y={14 + ((index + variant) % 3) * 14}
              width="4"
              height="4"
              fill="#d9f6ff"
              opacity=".86"
            />
          ))}
          <rect
            x="8"
            y="66"
            width="76"
            height="12"
            fill="#0c1b24"
            opacity=".7"
          />
          <rect
            x="22"
            y="58"
            width="18"
            height="20"
            fill="#112836"
            opacity=".72"
          />
          <rect
            x="52"
            y="52"
            width="24"
            height="26"
            fill="#102434"
            opacity=".72"
          />
        </g>
      ) : (
        <g>
          <rect
            x={variant ? 12 : 62}
            y="16"
            width="22"
            height="22"
            fill="#ffe58a"
          />
          <rect
            x="12"
            y="62"
            width="66"
            height="10"
            fill="#70a889"
            opacity=".45"
          />
          <rect
            x="20"
            y="72"
            width="52"
            height="10"
            fill="#568a72"
            opacity=".38"
          />
          <rect
            x={variant ? 38 : 14}
            y="28"
            width="32"
            height="8"
            fill="#e8ffff"
            opacity=".62"
          />
          <rect
            x={variant ? 48 : 24}
            y="22"
            width="24"
            height="8"
            fill="#e8ffff"
            opacity=".42"
          />
        </g>
      )}
      <rect
        x="16"
        y="18"
        width="52"
        height="10"
        fill="#dbf4f1"
        opacity={isNight ? ".18" : ".55"}
      />
      <rect
        x="18"
        y="72"
        width="58"
        height="8"
        fill="#e9fffb"
        opacity={isNight ? ".12" : ".22"}
      />
    </g>
  );
}

function PixelGymWorld({
  scene,
  timeOfDay,
}: {
  scene: (typeof MONTH_SCENES)[number];
  timeOfDay: GymTimeOfDay;
}) {
  return (
    <g data-pixel-gym-world="true">
      <defs>
        <pattern
          id={`gym-floor-tile-${scene.slug}`}
          width="96"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="40" fill="#b88e52" />
          <path
            d="M0 0h96M0 20h96M0 40h96M24 0v20M72 20v20"
            stroke="#8d6a3d"
            strokeWidth="2"
          />
          <rect x="6" y="5" width="34" height="8" fill="#d3ab68" opacity=".7" />
          <rect
            x="54"
            y="26"
            width="30"
            height="7"
            fill="#d0a461"
            opacity=".52"
          />
        </pattern>
        <linearGradient
          id={`gym-wall-depth-${scene.slug}`}
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor={scene.wall} />
          <stop offset=".58" stopColor="#203b47" />
          <stop offset="1" stopColor="#14262d" />
        </linearGradient>
        <linearGradient
          id={`gym-window-sheen-${scene.slug}`}
          x1="0"
          x2="1"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor="#ffffff" stopOpacity=".34" />
          <stop offset=".45" stopColor="#ffffff" stopOpacity=".04" />
          <stop offset="1" stopColor={scene.glow} stopOpacity=".2" />
        </linearGradient>
        <linearGradient
          id={`gym-floor-light-${scene.slug}`}
          x1="0"
          x2="1"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor="#fff0b9" stopOpacity=".22" />
          <stop offset=".55" stopColor="#ffffff" stopOpacity=".03" />
          <stop offset="1" stopColor="#071012" stopOpacity=".18" />
        </linearGradient>
      </defs>

      <rect width="390" height="640" fill="#182a31" />
      <rect
        width="390"
        height="640"
        fill={scene.glow}
        opacity=".04"
        className="pixel-gym-light"
      />

      {/* Polished SNES ceiling with ducts and strip lights. */}
      <rect
        y="0"
        width="390"
        height="88"
        fill="#071012"
        data-gym-detail="ceiling-ducts"
      />
      <path
        d="M0 88h390M0 44h390M92 0v88M196 0v88M300 0v88"
        stroke="#1e3034"
        strokeWidth="5"
      />
      <path
        d="M16 14h70M108 14h70M214 14h62M304 14h58"
        stroke="#324247"
        strokeWidth="5"
        opacity=".52"
      />
      <rect x="36" y="54" width="112" height="8" rx="2" fill="#fff1c8" />
      <rect x="236" y="50" width="116" height="8" rx="2" fill="#fff1c8" />
      <rect x="62" y="14" width="78" height="18" fill="#263335" />
      <rect x="262" y="12" width="86" height="20" fill="#263335" />
      <rect x="172" y="9" width="42" height="72" fill="#10191c" opacity=".82" />
      <path
        d="M182 16h22M182 28h22M182 40h22M182 52h22M182 64h22"
        stroke="#314247"
        strokeWidth="3"
        opacity=".75"
      />
      <circle
        cx="26"
        cy="28"
        r="11"
        fill="#152022"
        stroke="#425257"
        strokeWidth="4"
        opacity=".72"
      />
      <circle
        cx="348"
        cy="30"
        r="12"
        fill="#152022"
        stroke="#425257"
        strokeWidth="4"
        opacity=".72"
      />
      <g className="pixel-gym-light">
        <rect
          x="46"
          y="70"
          width="80"
          height="12"
          fill="#fff1c8"
          opacity=".12"
        />
        <rect
          x="252"
          y="66"
          width="76"
          height="12"
          fill="#fff1c8"
          opacity=".1"
        />
      </g>

      {/* Nice gym wall: polished, not noisy. */}
      <rect
        y="88"
        width="390"
        height="244"
        fill={`url(#gym-wall-depth-${scene.slug})`}
      />
      <rect y="88" width="390" height="28" fill="#284b58" opacity=".64" />
      <rect y="106" width="390" height="6" fill="#315766" />
      <rect y="184" width="390" height="5" fill="#172f38" />
      <rect y="264" width="390" height="5" fill="#172f38" />
      <g transform="translate(34 120)" data-gym-detail="mirror-window-wall">
        <rect x="-4" y="-4" width="224" height="120" fill="#09171c" />
        <rect width="216" height="112" fill="#0f2229" />
        <WindowPane x={8} timeOfDay={timeOfDay} />
        <WindowPane x={116} timeOfDay={timeOfDay} variant={1} />
        <rect
          x="8"
          y="0"
          width="92"
          height="96"
          fill={`url(#gym-window-sheen-${scene.slug})`}
        />
        <rect
          x="116"
          y="0"
          width="92"
          height="96"
          fill={`url(#gym-window-sheen-${scene.slug})`}
          opacity=".82"
        />
        <rect x="100" y="0" width="8" height="112" fill="#c7d6d7" />
        <rect x="0" y="52" width="216" height="8" fill="#c7d6d7" />
        <rect
          x="128"
          y="20"
          width="48"
          height="10"
          fill="#dbf4f1"
          opacity={timeOfDay === "night" ? ".16" : ".42"}
        />
        <rect
          x="136"
          y="74"
          width="42"
          height="8"
          fill="#e9fffb"
          opacity={timeOfDay === "night" ? ".1" : ".18"}
        />
      </g>

      {/* Brand sign and plan boards: small game-room details. */}
      <rect x="72" y="74" width="126" height="28" fill="#05090a" />
      <rect x="80" y="81" width="110" height="14" fill="#202d31" />
      <text
        x="135"
        y="93"
        textAnchor="middle"
        fill={scene.accent}
        fontFamily="monospace"
        fontWeight="900"
        fontSize="12"
      >
        GEEBS GYM
      </text>
      <g transform="translate(278 122)" data-gym-detail="program-board">
        <rect
          width="78"
          height="58"
          fill="#0b1213"
          stroke="#47616a"
          strokeWidth="4"
        />
        <rect x="10" y="12" width="42" height="5" fill={scene.accent} />
        <rect x="10" y="25" width="54" height="4" fill="#7f969c" />
        <rect x="10" y="37" width="42" height="4" fill="#7f969c" />
        <rect x="10" y="48" width="28" height="4" fill="#7f969c" />
      </g>
      <g transform="translate(38 248)">
        <rect
          width="70"
          height="44"
          fill="#0b1213"
          stroke="#47616a"
          strokeWidth="4"
        />
        <rect x="8" y="10" width="24" height="5" fill={scene.accent} />
        <rect x="8" y="23" width="48" height="4" fill="#7f969c" />
        <rect x="8" y="34" width="36" height="4" fill="#7f969c" />
      </g>
      <g transform="translate(184 286)" opacity=".68">
        <rect width="92" height="28" fill="#102025" />
        <rect x="6" y="6" width="80" height="6" fill="#7aaeb5" />
        <rect x="6" y="17" width="56" height="5" fill="#547f86" />
      </g>
      <g transform="translate(286 198)" opacity=".64" data-gym-detail="wall-tv">
        <rect width="58" height="34" rx="2" fill="#070b0c" />
        <rect x="4" y="4" width="50" height="22" fill="#314152" />
        <path
          d="M8 23c12-10 24-5 38-17"
          fill="none"
          stroke={scene.glow}
          strokeWidth="3"
          opacity=".55"
        />
        <rect x="22" y="29" width="14" height="3" fill="#5b6f73" />
      </g>

      {/* Clean SNES wood floor. */}
      <rect
        y="332"
        width="390"
        height="308"
        fill={`url(#gym-floor-tile-${scene.slug})`}
      />
      <rect
        y="332"
        width="390"
        height="308"
        fill={`url(#gym-floor-light-${scene.slug})`}
      />
      <rect y="332" width="390" height="58" fill="#e0bd76" opacity=".2" />
      <path
        d="M0 372h390M0 412h390M0 452h390M0 492h390M0 532h390M0 572h390M0 612h390"
        stroke="#8d6a3d"
        strokeWidth="2"
        opacity=".75"
      />
      <path
        d="M70 332 42 640M160 332 144 640M250 332 270 640M332 332 368 640"
        stroke="#7d603b"
        strokeWidth="2"
        opacity=".72"
      />
      <rect
        x="38"
        y="390"
        width="148"
        height="92"
        fill="#121b1d"
        stroke="#344143"
        strokeWidth="4"
      />
      <rect x="42" y="394" width="140" height="8" fill="#26383a" />
      <rect x="50" y="404" width="112" height="14" fill="#263335" />
      <rect x="50" y="436" width="100" height="12" fill="#314043" />
      <g data-gym-detail="floor-accessories">
        <rect
          x="202"
          y="510"
          width="58"
          height="12"
          rx="3"
          fill="#20282b"
          opacity=".82"
        />
        <rect x="213" y="498" width="9" height="20" rx="3" fill="#d9e4df" />
        <rect x="216" y="494" width="4" height="5" fill="#7d8e92" />
        <rect
          x="286"
          y="486"
          width="38"
          height="7"
          rx="3"
          fill={scene.accent}
          opacity=".72"
        />
        <rect x="292" y="476" width="7" height="18" fill="#28363a" />
        <rect x="313" y="476" width="7" height="18" fill="#28363a" />
      </g>
      <rect
        x="18"
        y="558"
        width="160"
        height="10"
        fill="#f0d084"
        opacity=".14"
      />
      <rect
        x="224"
        y="360"
        width="104"
        height="8"
        fill="#f0d084"
        opacity=".1"
      />
      <rect y="326" width="390" height="9" fill="#111719" />
    </g>
  );
}

export default function SeasonalGymBackground({
  scene,
}: {
  scene: (typeof MONTH_SCENES)[number];
}) {
  const [timeOfDay, setTimeOfDay] = useState<GymTimeOfDay>("day");

  useEffect(() => {
    const syncTimeOfDay = () => setTimeOfDay(gymTimeOfDay());
    syncTimeOfDay();
    const interval = window.setInterval(syncTimeOfDay, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="seasonal-pixel-gym absolute inset-0"
      data-chat-month={scene.slug}
      data-gym-time-of-day={timeOfDay}
      data-pixel-gym="snes"
      data-gym-render="polished"
    >
      <svg
        viewBox="0 0 390 640"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        shapeRendering="geometricPrecision"
        aria-hidden="true"
      >
        <PixelGymWorld scene={scene} timeOfDay={timeOfDay} />
        <PixelGymEquipment accent={scene.accent} />
        <g data-month-decor={scene.slug}>
          <MonthDecor month={scene.slug} />
        </g>
      </svg>
    </div>
  );
}
