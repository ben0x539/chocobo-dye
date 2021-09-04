import React from 'react';
import logo from './logo.svg';
import './App.css';

const { useRef, useState } = React;

type Color = readonly [number, number, number];

function addColors(a: Color, b: Color): Color | null {
  const color: { [Key in keyof Color]: Color[Key] } = [...a];
  b.forEach((c, i) => color[i] += c);
  if (color.some(c => c < 0 || c > 255)) return null;
  return color;
}

function cssColor(color: Color) {
  return `rgb(${color.join(', ')})`;
}

const DyeColors = {
  "Snow White": [228, 223, 208],
  "Ash Grey": [172, 168, 162],
  "Goobbue Grey": [137, 135, 132],
  "Slate Grey": [101, 101, 101],
  "Charcoal Grey": [72, 71, 66],
  "Soot Black": [43, 41, 35],
  "Rose Pink": [230, 159, 150],
  "Lilac Purple": [131, 105, 105],
  "Rolanberry Red": [91, 23, 41],
  "Dalamud Red": [120, 26, 26],
  "Rust Red": [98, 34, 7],
  "Wine Red": [69, 21, 17],
  "Coral Pink": [204, 108, 94],
  "Blood Red": [145, 59, 48],
  "Salmon Pink": [228, 170, 138],
  "Sunset Orange": [183, 92, 45],
  "Mesa Red": [125, 57, 6],
  "Bark Brown": [106, 75, 55],
  "Chocolate Brown": [110, 61, 36],
  "Russet Brown": [79, 45, 31],
  "Kobold Brown": [48, 33, 27],
  "Cork Brown": [201, 145, 86],
  "Qiqirn Brown": [153, 110, 63],
  "Opo-Opo Brown": [123, 92, 45],
  "Aldgoat Brown": [162, 135, 92],
  "Pumpkin Orange": [197, 116, 36],
  "Acorn Brown": [142, 88, 27],
  "Orchard Brown": [100, 66, 22],
  "Chestnut Brown": [61, 41, 13],
  "Gobbiebag Brown": [185, 164, 137],
  "Shale Brown": [146, 129, 108],
  "Mole Brown": [97, 82, 69],
  "Loam Brown": [63, 51, 41],
  "Bone White": [235, 211, 160],
  "Ul Brown": [183, 163, 112],
  "Desert Yellow": [219, 180, 87],
  "Honey Yellow": [250, 198, 43],
  "Millioncorn Yellow": [228, 158, 52],
  "Coeurl Yellow": [188, 136, 4],
  "Cream Yellow": [242, 215, 112],
  "Halatali Yellow": [165, 132, 48],
  "Raisin Brown": [64, 51, 17],
  "Mud Green": [88, 82, 48],
  "Sylph Green": [187, 187, 138],
  "Lime Green": [171, 176, 84],
  "Moss Green": [112, 115, 38],
  "Meadow Green": [139, 156, 99],
  "Olive Green": [75, 82, 50],
  "Marsh Green": [50, 54, 33],
  "Apple Green": [149, 174, 92],
  "Cactuar Green": [101, 130, 65],
  "Hunter Green": [40, 75, 38],
  "Ochu Green": [64, 99, 57],
  "Adamantoise Green": [95, 117, 88],
  "Nophica Green": [59, 77, 60],
  "Deepwood Green": [30, 42, 33],
  "Celeste Green": [150, 189, 185],
  "Turquoise Green": [67, 114, 144],
  "Morbol Green": [31, 70, 70],
  "Ice Blue": [178, 196, 206],
  "Sky Blue": [131, 176, 210],
  "Seafog Blue": [100, 129, 160],
  "Peacock Blue": [59, 104, 134],
  "Rhotano Blue": [28, 61, 84],
  "Corpse Blue": [142, 155, 172],
  "Ceruleam Blue": [79, 87, 102],
  "Woad Blue": [47, 56, 81],
  "Ink Blue": [26, 31, 39],
  "Raptor Blue": [91, 127, 192],
  "Othard Blue": [47, 88, 137],
  "Storm Blue": [35, 65, 114],
  "Void Blue": [17, 41, 68],
  "Royal Blue": [39, 48, 103],
  "Midnight Blue": [24, 25, 55],
  "Shadow Blue": [55, 55, 71],
  "Abyssal Blue": [49, 45, 87],
  "Lavender Purple": [135, 127, 174],
  "Gloom Purple": [81, 69, 96],
  "Currant Purple": [50, 44, 59],
  "Iris Purple": [183, 158, 188],
  "Grape Purple": [59, 42, 61],
  "Lotus Pink": [254, 206, 245],
  "Colibri Pink": [220, 155, 202],
  "Plum Purple": [121, 82, 108],
  "Regal Purple": [102, 48, 78],
} as const;

interface Fruit {
  readonly name: string;
  readonly colorDiff: Color;
}

const fruits = [
  { name: "Xelphatol Apple",      colorDiff: [+5, -5, -5] },
  { name: "Mamook Pear",          colorDiff: [-5, +5, -5] },
  { name: "O'Ghomoro Berries",    colorDiff: [-5, -5, +5] },
  { name: "Doman Plum",           colorDiff: [-5, -5, +5] },
  { name: "Valfruit",             colorDiff: [+5, -5, +5] },
  { name: "Cieldalaes Pineapple", colorDiff: [+5, +5, -5] },
] as const;

function FeedFruit({ fruit, onFeed }: { fruit: Fruit, onFeed: (_: Fruit) => void }) {
  return <div className="FeedFruit">
    <button onClick={() => onFeed(fruit)}>{fruit.name}</button>
  </div>;
}

function ShowFruit({ fruit: { name, colorDiff } }: { fruit: Fruit }) {
  return <>{name}</>;
}

function ColorBadge({ color }: { color: Color }) {
  const style = {
    ['--color-badge' as any]: cssColor(color),
  };
  let rgb = color.flatMap((c, i) => [
      <React.Fragment key={i*2}>, </React.Fragment>,
      <span key={i*2+1} className="ColorBadgeLabelComponent">{c}</span>])
    .slice(1);
  return <span className="ColorBadge" style={style}>
    <span className="ColorBadgeLabel">{rgb}</span>
  </span>;
}

interface Step {
  readonly color: Color;
  readonly fruit: Fruit;
}

function History({ history}: { history: Step[]}) {
  const lastRow: any = useRef(null);
  const rows = history.map(({ color, fruit }, i) => {
    return <tr key={i} ref={i == history.length - 1 ? lastRow : null}>
      <td><ColorBadge color={color} /></td>
      <td><ShowFruit fruit={fruit} /></td>
    </tr>;
  });
  React.useEffect(() => {
    if (lastRow.current !== null) {
      lastRow.current.scrollIntoView();
    }
  }, [history.length]);
  return <div className="History">
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>
}

function Controls({ onFeed, color }: { onFeed: (_: Fruit) => void, color: Color }) {
  return <div className="Controls">
    <p>Current color: <ColorBadge color={color} /></p>
    { fruits.map((fruit, i) => <FeedFruit key={i} onFeed={onFeed} fruit={fruit}/>) }
  </div>
}

function pct(n: number): string {
  return `${(n / 255 * 100)|0}%`;
}

interface MapColorProps {
  readonly label: string,
  readonly color: Color,
  readonly key: any;
}
function MapColor({ label, color, key }: MapColorProps) {
  let [r, g, b] = color.map(c => c/255.0);
  let x = (1+g-b)/2;
  let y = (1-r) * 2/3 + (g+b)/2 * 1/3;
  const style = {
    whiteSpace: 'nowrap' as any,
    position: 'absolute' as const,
    left: `${x * 100}%`,
    top: `${y * 100}%`,
    transform: `translate(-${x*100}%, -${y*100}%)`,
    align: 'center',
  };
  return <div key={key} className="MapDyeColor" style={style}>
    <div>{label}</div>
    <ColorBadge color={color} />
  </div>;
}

interface MapProps {
  readonly history: Step[],
}


function Map({ history }: MapProps) {
  const dyes = Object.entries(DyeColors).map(([name, color], i) => {
    return <MapColor label={name} color={color} key={i} />;
  });
  const path = history.slice(-1).map(({ color }, i) => {
    return <MapColor label={`Step ${i}`} color={color} key={i} />;
  });
  const style = { zIndex: 10 };
  return <div className="Map">
    {dyes}
    <div style={style}>{path}</div>
  </div>;
}

export default App;

interface State {
  readonly initialColor: Color;
  readonly history: Step[];
}

function App() {
  const [{ initialColor, history }, setState] = useState<State>({
    initialColor: DyeColors["Desert Yellow"],
    history: [],
  });
  const currentColor = history.length > 0
    ? history[history.length - 1].color
    : initialColor;
  const onFeed = (fruit: Fruit) => {
    const color = addColors(currentColor, fruit.colorDiff);
    if (!color) return;
    history.push({ color, fruit });
    setState({ initialColor, history });
  };
  const styleCurrent = {
    ['--app-current-color' as any]: cssColor(currentColor),
  };
  return (
    <div className="App" style={styleCurrent}>
      <div className="AppGrid">
        <Map history={history} />
        <Controls color={currentColor} onFeed={onFeed} />
        <History history={history}/>
      </div>
    </div>
  );
}
