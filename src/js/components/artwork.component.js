const TAU = Math.PI * 2;

function line(ctx, points, color, width = 1) {
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  for (const point of points.slice(1)) ctx.lineTo(...point);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function arc(ctx, x, y, radius, start, end, color, width = 1) {
  ctx.beginPath();
  ctx.arc(x, y, radius, start, end);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function dot(ctx, x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.fillStyle = color;
  ctx.fill();
}

function pointAt(x, y, angle, radius) {
  return [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius];
}

function drawHero(ctx) {
  const x = 364;
  const y = 298;
  const olive = '#56652f';
  const fine = '#7180447d';
  const dark = '#4b582e';

  for (const radius of [176, 216, 229, 249]) {
    arc(ctx, x, y, radius, 0, TAU, fine);
  }

  ctx.setLineDash([4, 7]);
  arc(ctx, x, y, 238, 0, TAU, fine);
  line(ctx, [[20, y], [680, y]], fine);
  line(ctx, [[x, 26], [x, 578]], fine);
  ctx.setLineDash([]);

  const arcs = [[.14, .72], [1.62, 2.23], [2.76, 3.09], [3.25, 3.93], [4.06, 4.48], [4.99, 5.45], [5.62, 6.04]];
  for (const [start, end] of arcs) {
    arc(ctx, x, y, 220, start, end, olive, 2.4);
    arc(ctx, x, y, 254, start + .04, end - .04, fine);
  }

  for (let index = 0; index < 90; index += 1) {
    const angle = index * TAU / 90;
    const length = index % 5 === 0 ? 8 : 3.5;
    line(ctx, [pointAt(x, y, angle, 228), pointAt(x, y, angle, 228 + length)], fine);
  }

  const traces = [
    [[35, 113], [98, 113], [137, 152], [167, 152], [187, 172]],
    [[72, 127], [95, 127], [133, 165], [155, 165]],
    [[24, 201], [85, 201], [105, 221], [140, 221]],
    [[63, 218], [83, 218], [100, 235], [131, 235]],
    [[50, 331], [96, 331], [126, 361], [146, 361]],
    [[32, 392], [94, 392], [123, 421], [155, 421]],
    [[64, 408], [92, 408], [122, 438], [170, 438]],
    [[134, 505], [163, 505], [187, 481], [219, 481]],
    [[223, 46], [223, 85], [245, 108]],
    [[477, 46], [477, 76], [453, 100]],
    [[655, 110], [602, 110], [565, 147], [535, 147]],
    [[679, 164], [626, 164], [590, 200], [559, 200]],
    [[651, 179], [630, 179], [592, 217]],
    [[676, 264], [638, 264], [611, 237], [588, 237]],
    [[659, 329], [629, 329], [605, 353], [578, 353]],
    [[684, 409], [637, 409], [610, 382], [575, 382]],
    [[668, 426], [633, 426], [610, 403]],
    [[615, 499], [582, 499], [555, 472], [523, 472]],
    [[532, 553], [532, 524], [504, 496]]
  ];

  traces.forEach((trace, index) => {
    const color = index % 3 === 0 ? olive : fine;
    line(ctx, trace, color);
    arc(ctx, ...trace[0], 3.2, 0, TAU, color);
  });

  for (const angle of [.17, .65, 1.13, 2.28, 2.78, 3.3, 3.8, 4.37, 4.81, 5.44, 5.96]) {
    const point = pointAt(x, y, angle, 249);
    dot(ctx, ...point, 6, '#efefe7');
    arc(ctx, ...point, 6, 0, TAU, dark);
    dot(ctx, ...point, 2.4, dark);
  }

  for (const [left, top] of [[37, 50], [659, 50], [37, 553], [659, 553]]) {
    line(ctx, [[left - 6, top], [left + 6, top]], olive);
    line(ctx, [[left, top - 6], [left, top + 6]], olive);
  }
}

function drawNotes(ctx) {
  const nodes = [
    [310, 150, 37], [217, 87, 14], [141, 152, 9], [191, 212, 17],
    [343, 61, 13], [405, 105, 17], [483, 68, 9], [458, 166, 12],
    [402, 218, 16], [514, 226, 7], [291, 248, 8], [100, 84, 7]
  ];
  const edges = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 7], [0, 8], [0, 10], [1, 2], [1, 11], [2, 3], [2, 11], [3, 10], [4, 5], [5, 6], [5, 7], [6, 7], [7, 8], [7, 9], [8, 9], [8, 10]];
  for (const [a, b] of edges) {
    line(ctx, [nodes[a].slice(0, 2), nodes[b].slice(0, 2)], a === 0 ? '#404776ab' : '#535f965f', a === 0 ? 1.55 : 1);
  }

  arc(ctx, 310, 150, 52, 0, TAU, '#626a9f87');
  for (const [x, y, radius] of nodes.slice(1)) {
    dot(ctx, x, y, radius, '#e8e9fb');
    arc(ctx, x, y, radius, 0, TAU, '#575e8c');
    dot(ctx, x, y, 2.6, '#3c456e');
  }

  dot(ctx, 310, 150, 37, '#303658');
  ctx.fillStyle = '#f2f2fc';
  ctx.font = '24px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MD', 310, 150);
}

export function initArtwork() {
  for (const [selector, draw] of [['.hero-canvas', drawHero], ['[data-illustration="notes"]', drawNotes]]) {
    const canvas = document.querySelector(selector);
    const ctx = canvas?.getContext('2d');
    if (!ctx) continue;

    const { width, height } = canvas;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    ctx.scale(canvas.width / width, canvas.height / height);
    draw(ctx);
  }
}
