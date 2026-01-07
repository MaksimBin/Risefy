let prevRadius = 0;
let prevFontSize = 0;
let particles = [];
let animationId = null;

const lerp = (a, b, t) => a + (b - a) * t;


function draw() {
  animationId = requestAnimationFrame(draw);
  
  // === ОБНОВЛЕНИЕ РАЗМЕРОВ ===
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const width = canvas.width;
  const height = canvas.height;
  const cx = width / 2;
  const cy = height / 2;
  
  // === ПОЛНАЯ ОЧИСТКА КАДРА ===
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  ctx.shadowBlur = 0;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0a0f1f';
  ctx.fillRect(0, 0, width, height);
  
  // === АУДИО ДАННЫЕ ===
  const spectrum = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(spectrum);
  
  const bass = spectrum.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
  const avg = spectrum.reduce((sum, val) => sum + val, 0) / spectrum.length;
  const norm = avg / 255;
  const time = performance.now() * 0.001;
  
  // === ПУЛЬСИРУЮЩИЙ КРУГ ===
  const baseRadius = Math.min(width, height) * 0.15;
  const targetRadius = baseRadius + norm * 100 + Math.sin(time * 6) * 6;
  const radius = lerp(prevRadius, targetRadius, 0.3);
  prevRadius = radius;
  
  const hue = 200 + Math.sin(time * 2) * 60 + norm * 80;
  const saturation = 85;
  const lightness = 55 + norm * 30;
  
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  ctx.lineWidth = 2 + norm * 5;
  ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
  ctx.shadowBlur = 15 + norm * 35;
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  // === ТЕКСТ RISEFY ===
  const targetFontSize = radius * 0.9 + norm * 25;
  const fontSize = lerp(prevFontSize, targetFontSize, 0.3);
  prevFontSize = fontSize;
  
  ctx.font = `${fontSize}px 'Segoe UI', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const textHue = hue + 40;
  const textLight = 60 + norm * 35;
  ctx.fillStyle = `hsl(${textHue}, 90%, ${textLight}%)`;
  ctx.shadowColor = `hsl(${textHue}, 90%, ${textLight + 10}%)`;
  ctx.shadowBlur = 10 + norm * 25;
  
  const pulseOffset = Math.sin(time * 5) * norm * 12;
  ctx.fillText('RISEFY', cx, cy + pulseOffset);
  ctx.shadowBlur = 0;
  
  // === ПЕСОК: ограничено и очищается ===
  if (bass > 180 && particles.length < 30) {
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 2;
      const color = `hsl(${Math.random() * 360}, 80%, 70%)`;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 20,
        color,
      });
    }
  }
  
  const nextParticles = [];
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 1;
    if (p.life > 0) {
      nextParticles.push(p);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }
  particles = nextParticles;
}




//////////

let prevRadius = 0;
let prevFontSize = 0;
let flares = [];
let animationId = null;

const lerp = (a, b, t) => a + (b - a) * t;

function draw() {
  animationId = requestAnimationFrame(draw);
  
  // === АДАПТАЦИЯ ПОД ЭКРАН ===
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const width = canvas.width;
  const height = canvas.height;
  const cx = width / 2;
  const cy = height / 2;
  const minDim = Math.min(width, height);
  const scale = minDim / 800; // базовая шкала от 800px
  
  // === ФОН КОСМОСА ===
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  ctx.shadowBlur = 0;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#05070d';
  ctx.fillRect(0, 0, width, height);
  
  // === АУДИО ===
  const spectrum = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(spectrum);
  const bass = spectrum.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
  const avg = spectrum.reduce((sum, val) => sum + val, 0) / spectrum.length;
  const norm = avg / 255;
  const time = performance.now() * 0.001;
  
  // === ЯДРО СОЛНЦА ===
  const baseRadius = minDim * 0.18;
  const targetRadius = baseRadius + norm * 120 * scale + Math.sin(time * 5) * 8 * scale;
  const radius = lerp(prevRadius, targetRadius, 0.25);
  prevRadius = radius;
  
  const hue = 40 + Math.sin(time * 1.5) * 20 + norm * 60;
  const saturation = 95;
  const lightness = 55 + norm * 25;
  
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  ctx.lineWidth = 3 * scale + norm * 6 * scale;
  ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness + 15}%)`;
  ctx.shadowBlur = 25 * scale + norm * 40 * scale;
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  // === КОРОНАЛЬНЫЕ ВСПЫШКИ: ОТСКОКИ ОТ ЦЕНТРА ===
  const loopEnergy = spectrum.slice(20, 60).reduce((a, b) => a + b, 0) / 40;
  const loopNorm = loopEnergy / 255;
  const loopCount = 8;
  
  for (let i = 0; i < loopCount; i++) {
    const angle = (i * Math.PI * 2 / loopCount);
    const pulse = Math.sin(time * 4 + i) * 0.5 + loopNorm * 1.5;
    const distance = radius + 40 * scale + pulse * 60 * scale;
    const x = cx + Math.cos(angle) * distance;
    const y = cy + Math.sin(angle) * distance;
    
    ctx.beginPath();
    ctx.arc(x, y, 5 * scale + loopNorm * 5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${hue + 30 + loopNorm * 40}, ${saturation}%, ${lightness + 10 + loopNorm * 20}%)`;
    ctx.shadowColor = `hsl(${hue + 30 + loopNorm * 40}, ${saturation}%, ${lightness + 30}%)`;
    ctx.shadowBlur = 20 * scale + loopNorm * 30 * scale;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  
  // === ТЕКСТ: SOLAR FLARE ===
  const targetFontSize = radius * 0.7 + norm * 30 * scale;
  const fontSize = lerp(prevFontSize, targetFontSize, 0.3);
  prevFontSize = fontSize;
  
  ctx.font = `${fontSize}px 'Segoe UI', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  ctx.fillStyle = `hsl(${hue + 60}, 100%, ${lightness + 10}%)`;
  ctx.shadowColor = `hsl(${hue + 60}, 100%, ${lightness + 20}%)`;
  ctx.shadowBlur = 20 * scale + norm * 30 * scale;
  
  const pulseOffset = Math.sin(time * 4) * norm * 10 * scale;
  ctx.fillText('RISEFY', cx, cy + pulseOffset);
  ctx.shadowBlur = 0;
  
  // === ВСПЫШКИ: ЭНЕРГЕТИЧЕСКИЕ ЧАСТИЦЫ ===
  if (bass > 170 && flares.length < 50) {
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (3 + Math.random() * 3) * scale;
      const color = `hsl(${hue + Math.random() * 60}, 100%, 70%)`;
      flares.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 25,
        color,
      });
    }
  }
  
  const nextFlares = [];
  for (let f of flares) {
    f.x += f.vx;
    f.y += f.vy;
    f.life -= 1;
    if (f.life > 0) {
      nextFlares.push(f);
      ctx.beginPath();
      ctx.arc(f.x, f.y, 2.5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = f.color;
      ctx.fill();
    }
  }
  flares = nextFlares;
}
///////////




//////////
let animationId = null;
const bars = 128;
const flares = [];
const lerp = (a, b, t) => a + (b - a) * t;

function draw() {
  animationId = requestAnimationFrame(draw);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const { width, height } = canvas;
  const cx = width / 2;
  const cy = height / 2;
  const minDim = Math.min(width, height);
  const scale = minDim / 800;
  const time = performance.now() * 0.001;
  
  // === BACKGROUND ===
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0a0c10';
  ctx.fillRect(0, 0, width, height);
  
  // === AUDIO ===
  const spectrum = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(spectrum);
  const norm = spectrum.reduce((a, b) => a + b, 0) / (spectrum.length * 255);
  const bass = spectrum.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
  
  // === SPECTRUM RING ===
  const baseRadius = minDim * 0.28;
  const points = [];
  
  for (let i = 0; i < bars; i++) {
    const angle = (i / bars) * Math.PI * 2;
    const value = spectrum[i] || 0;
    const length = (value / 255) * 100 * scale;
    const r = baseRadius + length;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    points.push({ x, y, value });
  }
  
  // === DRAW BARS ===
  for (let i = 0; i < bars; i++) {
    const angle = (i / bars) * Math.PI * 2;
    const value = spectrum[i] || 0;
    const r1 = baseRadius;
    const r2 = baseRadius + (value / 255) * 100 * scale;
    const x1 = cx + Math.cos(angle) * r1;
    const y1 = cy + Math.sin(angle) * r1;
    const x2 = cx + Math.cos(angle) * r2;
    const y2 = cy + Math.sin(angle) * r2;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `hsl(${180 + value / 2}, 90%, ${40 + value / 4}%)`;
    ctx.lineWidth = 2 * scale;
    ctx.stroke();
  }
  
  // === LIGHTNING WAVE BETWEEN TIPS ===
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const next = points[(i + 1) % points.length];
    const midX = (p.x + next.x) / 2 + Math.sin(time * 5 + i) * 5 * scale;
    const midY = (p.y + next.y) / 2 + Math.cos(time * 5 + i) * 5 * scale;
    
    ctx.moveTo(p.x, p.y);
    ctx.quadraticCurveTo(midX, midY, next.x, next.y);
  }
  ctx.strokeStyle = `hsla(${200 + norm * 100}, 100%, 70%, 0.3)`;
  ctx.lineWidth = 1.5 * scale;
  ctx.stroke();
  
  // === PARTICLE BURSTS ===
  if (bass > 160 && flares.length < 40) {
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      flares.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30,
        color: `hsl(${200 + Math.random() * 100}, 100%, 60%)`,
      });
    }
  }
  
  const nextFlares = [];
  for (let f of flares) {
    f.x += f.vx;
    f.y += f.vy;
    f.life -= 1;
    if (f.life > 0) {
      nextFlares.push(f);
      ctx.beginPath();
      ctx.arc(f.x, f.y, 2.5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = f.color;
      ctx.fill();
    }
  }
  flares.length = 0;
  flares.push(...nextFlares);
}
///////////


//////////
let animationId = null;
const bars = 96;
const lerp = (a, b, t) => a + (b - a) * t;
const tips = new Array(bars).fill(0);

function draw() {
  animationId = requestAnimationFrame(draw);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const { width, height } = canvas;
  const scale = Math.min(width, height) / 800;
  const time = performance.now() * 0.001;
  
  // === BACKGROUND ===
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0a0c10';
  ctx.fillRect(0, 0, width, height);
  
  // === AUDIO ===
  const spectrum = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(spectrum);
  
  // === SPECTRUM BARS ===
  const barWidth = width / bars;
  const maxHeight = height * 0.6;
  
  for (let i = 0; i < bars; i++) {
    const value = spectrum[i] || 0;
    const barHeight = (value / 255) * maxHeight;
    const x = i * barWidth;
    const y = height - barHeight;
    
    // === MAIN BAR ===
    ctx.fillStyle = `hsl(${180 + value}, 80%, ${40 + value / 4}%)`;
    ctx.fillRect(x, y, barWidth * 0.8, barHeight);
    
    // === TIP BOUNCE ===
    const targetTipY = y - 10 * scale;
    tips[i] = lerp(tips[i], targetTipY, 0.2);
    if (tips[i] > targetTipY) tips[i] -= 1.5 * scale;
    
    ctx.fillStyle = `hsl(${200 + value}, 100%, 70%)`;
    ctx.fillRect(x, tips[i], barWidth * 0.8, 4 * scale);
  }
}
///////////


let animationId = null;
const bars = 32;
const lerp = (a, b, t) => a + (b - a) * t;
let prevFontSize = 0;

function draw() {
  animationId = requestAnimationFrame(draw);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const { width, height } = canvas;
  const scale = Math.min(width, height) / 800;
  const time = performance.now() * 0.001;
  
  // === BACKGROUND ===
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0a0c10';
  ctx.fillRect(0, 0, width, height);
  
  // === AUDIO ===
  const spectrum = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(spectrum);
  const norm = spectrum.reduce((a, b) => a + b, 0) / (spectrum.length * 255);
  
  // === CENTERED MIRRORED SPECTRUM (NO GAP) ===
  const totalBarWidth = width * 0.9;
  const barWidth = totalBarWidth / bars;
  const startX = (width - totalBarWidth) / 2;
  const maxHeight = height * 0.3;
  
  for (let i = 0; i < bars; i++) {
    const value = spectrum[i] || 0;
    const barHeight = (value / 255) * maxHeight;
    const x = startX + i * barWidth;
    const yCenter = height / 2;
    
    // === DYNAMIC COLOR GRADIENT ===
    const hueShift = time * 60 + i * 10;
    const baseHue = 180 + value + hueShift;
    const saturation = 90 + Math.sin(time + i * 0.2) * 10;
    const lightnessTop = 55 + value / 3;
    const lightnessBottom = 25 + Math.sin(time * 2 + i * 0.3) * 10;
    
    const gradient = ctx.createLinearGradient(x, yCenter - barHeight, x, yCenter + barHeight);
    gradient.addColorStop(0, `hsl(${baseHue}, ${saturation}%, ${lightnessTop}%)`);
    gradient.addColorStop(1, `hsl(${baseHue + 30}, ${saturation}%, ${lightnessBottom}%)`);
    ctx.fillStyle = gradient;
    
    const radius = barWidth * 0.8;
    
    // === BAR UP ===
    ctx.beginPath();
    ctx.moveTo(x, yCenter);
    ctx.lineTo(x, yCenter - barHeight + radius);
    ctx.arcTo(x, yCenter - barHeight, x + barWidth * 0.9, yCenter - barHeight, radius);
    ctx.arcTo(x + barWidth * 0.9, yCenter - barHeight, x + barWidth * 0.9, yCenter - barHeight + radius, radius);
    ctx.lineTo(x + barWidth * 0.9, yCenter);
    ctx.closePath();
    ctx.fill();
    
    // === BAR DOWN ===
    ctx.beginPath();
    ctx.moveTo(x, yCenter);
    ctx.lineTo(x, yCenter + barHeight - radius);
    ctx.arcTo(x, yCenter + barHeight, x + barWidth * 0.9, yCenter + barHeight, radius);
    ctx.arcTo(x + barWidth * 0.9, yCenter + barHeight, x + barWidth * 0.9, yCenter + barHeight - radius, radius);
    ctx.lineTo(x + barWidth * 0.9, yCenter);
    ctx.closePath();
    ctx.fill();
  }
  
  // === TITLE TEXT WITH GRADIENT PER LETTER ===
  const targetFontSize = height * 0.08;
  const fontSize = lerp(prevFontSize, targetFontSize, 0.2);
  prevFontSize = fontSize;
  
  const text = 'RISEFY';
  const spacing = fontSize * 0.6;
  const textStartX = width / 2 - (text.length - 1) * spacing / 2;
  const textY = height * 0.05;
  
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';
  ctx.font = `${fontSize}px 'Segoe UI', sans-serif`;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const x = textStartX + i * spacing;
    const value = spectrum[i * 2] || 0;
    const hue = 180 + value;
    const light = 50 + value / 4;
    
    ctx.fillStyle = `hsl(${hue}, 80%, ${light}%)`;
    ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
    ctx.shadowBlur = 30 * scale + norm * 40 * scale;
    ctx.fillText(char, x, textY);
  }
  
  ctx.shadowBlur = 0;
  
  // === AUDIO-REACTIVE PULSING BORDERS (ALL SIDES) ===
  const borderWidth = width * 0.01;
  const borderHeight = height * 0.01;
  const borderGlow = 40 * scale + norm * 50 * scale;
  const radius = borderWidth * 3;
  const pulse = Math.sin(time * 2) * 0.5 + 0.5;
  
  // LEFT
  const leftVal = spectrum[10] || 0;
  const leftHue = 180 + leftVal + pulse * 40;
  const leftLight = 50 + leftVal / 4 + pulse * 10;
  ctx.fillStyle = `hsl(${leftHue}, 80%, ${leftLight}%)`;
  ctx.shadowColor = `hsl(${leftHue}, 100%, 70%)`;
  ctx.shadowBlur = borderGlow;
  ctx.beginPath();
  ctx.moveTo(0, radius);
  ctx.arcTo(0, 0, borderWidth, 0, radius);
  ctx.lineTo(borderWidth, height - radius);
  ctx.arcTo(borderWidth, height, 0, height, radius);
  ctx.closePath();
  ctx.fill();
  
  // RIGHT
  const rightVal = spectrum[14] || 0;
  const rightHue = 200 + rightVal + pulse * 40;
  const rightLight = 50 + rightVal / 4 + pulse * 10;
  ctx.fillStyle = `hsl(${rightHue}, 80%, ${rightLight}%)`;
  ctx.shadowColor = `hsl(${rightHue}, 100%, 70%)`;
  ctx.beginPath();
  ctx.moveTo(width, radius);
  ctx.arcTo(width, 0, width - borderWidth, 0, radius);
  ctx.lineTo(width - borderWidth, height - radius);
  ctx.arcTo(width - borderWidth, height, width, height, radius);
  ctx.closePath();
  ctx.fill();
  
  // TOP
  const topVal = spectrum[20] || 0;
  const topHue = 160 + topVal + pulse * 40;
  const topLight = 50 + topVal / 4 + pulse * 10;
  ctx.fillStyle = `hsl(${topHue}, 80%, ${topLight}%)`;
  ctx.shadowColor = `hsl(${topHue}, 100%, 70%)`;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.arcTo(0, 0, 0, borderHeight, radius);
  ctx.lineTo(width - radius, borderHeight);
  ctx.arcTo(width, borderHeight, width, 0, radius);
  ctx.closePath();
  ctx.fill();
  
  // BOTTOM
  const bottomVal = spectrum[24] || 0;
  const bottomHue = 140 + bottomVal + pulse * 40;
  const bottomLight = 50 + bottomVal / 4 + pulse * 10;
  ctx.fillStyle = `hsl(${bottomHue}, 80%, ${bottomLight}%)`;
  ctx.shadowColor = `hsl(${bottomHue}, 100%, 70%)`;
  ctx.beginPath();
  ctx.moveTo(radius, height);
  ctx.arcTo(0, height, 0, height - borderHeight, radius);
  ctx.lineTo(width - radius, height - borderHeight);
  ctx.arcTo(width, height - borderHeight, width, height, radius);
  ctx.closePath();
  ctx.fill();
  
  ctx.shadowBlur = 0;
}



//////////
/////////тот самый
let animationId = null;
const bars = 96;
const lerp = (a, b, t) => a + (b - a) * t;
const tips = new Array(bars).fill(0);

const text = "RISEFY"; // фиксированный текст

function draw() {
  animationId = requestAnimationFrame(draw);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const { width, height } = canvas;
  const scale = Math.min(width, height) / 800;
  
  // === BACKGROUND DARK GRADIENT ===
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "hsl(220, 40%, 10%)");
  gradient.addColorStop(0.5, "hsl(260, 30%, 8%)");
  gradient.addColorStop(1, "hsl(200, 30%, 5%)");
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // === AUDIO ===
  const spectrum = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(spectrum);
  
  // === SPECTRUM BARS ===
  const barWidth = width / bars;
  const maxHeight = height * 0.6;
  
  for (let i = 0; i < bars; i++) {
    const value = spectrum[i] || 0;
    const barHeight = (value / 255) * maxHeight;
    const x = i * barWidth;
    const y = height - barHeight;
    
    // MAIN BAR
    ctx.fillStyle = `hsl(${180 + value}, 80%, ${40 + value / 4}%)`;
    ctx.fillRect(x, y, barWidth * 0.8, barHeight);
    
    // TIP BOUNCE
    const targetTipY = y - 10 * scale;
    tips[i] = lerp(tips[i], targetTipY, 0.2);
    if (tips[i] > targetTipY) tips[i] -= 1.5 * scale;
    
    ctx.fillStyle = `hsl(${200 + value}, 100%, 70%)`;
    ctx.fillRect(x, tips[i], barWidth * 0.8, 4 * scale);
  }
  
  // === TEXT ===
  const fontSize = 140 * scale;
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  
  const baseY = height * 0.1;
  const letterSpacing = fontSize * 0.8;
  const totalWidth = letterSpacing * text.length;
  let startX = width / 2 - totalWidth / 2 + letterSpacing / 2;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const value = spectrum[i % bars];
    const hue = 180 + value;
    const lightness = 40 + value / 4;
    
    const jitterY = (value / 255) * 30 * scale;
    
    ctx.fillStyle = `hsl(${hue}, 80%, ${lightness}%)`;
    ctx.fillText(char, startX + i * letterSpacing, baseY + jitterY);
  }
}


//////////


/////////////
let animationId = null;
const bars = 96;
const lerp = (a, b, t) => a + (b - a) * t;
const tips = new Array(bars).fill(0);

const text = "RISEFY"; // фиксированный текст

function roundedRectPath(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

function draw() {
  animationId = requestAnimationFrame(draw);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const { width, height } = canvas;
  const scale = Math.min(width, height) / 800;
  
  // === BACKGROUND DARK GRADIENT ===
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "hsl(220, 40%, 10%)");
  gradient.addColorStop(0.5, "hsl(260, 30%, 8%)");
  gradient.addColorStop(1, "hsl(200, 30%, 5%)");
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // === AUDIO ===
  const spectrum = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(spectrum);
  
  // === GRID: larger cells, proper rounded squares, per-cell color ===
  const gridSize = 140 * scale; // увеличенный размер квадрата
  const padding = 24 * scale; // увеличенный внутренний отступ
  const radius = 18 * scale; // закругление углов
  ctx.lineWidth = 2;
  
  let index = 0;
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      const innerX = x + padding;
      const innerY = y + padding;
      const innerW = gridSize - padding * 2;
      const innerH = gridSize - padding * 2;
      
      // если из-за padding квадрат выходит за пределы — пропускаем
      if (innerW <= 0 || innerH <= 0) continue;
      
      const value = spectrum[index % bars] || 0;
      const hue = 180 + value;
      const lightness = 40 + value / 4;
      
      ctx.strokeStyle = `hsl(${hue}, 80%, ${lightness}%)`;
      roundedRectPath(ctx, innerX, innerY, innerW, innerH, radius);
      ctx.stroke();
      
      index++;
    }
  }
  
  // === SPECTRUM BARS ===
  const barWidth = width / bars;
  const maxHeight = height * 0.6;
  
  for (let i = 0; i < bars; i++) {
    const value = spectrum[i] || 0;
    const barHeight = (value / 255) * maxHeight;
    const x = i * barWidth;
    const y = height - barHeight;
    
    // MAIN BAR
    ctx.fillStyle = `hsl(${180 + value}, 80%, ${40 + value / 4}%)`;
    ctx.fillRect(x, y, barWidth * 0.8, barHeight);
    
    // TIP BOUNCE
    const targetTipY = y - 10 * scale;
    tips[i] = lerp(tips[i], targetTipY, 0.2);
    if (tips[i] > targetTipY) tips[i] -= 1.5 * scale;
    
    ctx.fillStyle = `hsl(${200 + value}, 100%, 70%)`;
    ctx.fillRect(x, tips[i], barWidth * 0.8, 4 * scale);
  }
  
  // === TEXT ===
  const fontSize = 140 * scale;
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  
  const baseY = height * 0.1;
  const letterSpacing = fontSize * 0.8;
  const totalWidth = letterSpacing * text.length;
  let startX = width / 2 - totalWidth / 2 + letterSpacing / 2;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const value = spectrum[i % bars] || 0;
    const hue = 180 + value;
    const lightness = 40 + value / 4;
    
    const jitterY = (value / 255) * 30 * scale;
    
    ctx.fillStyle = `hsl(${hue}, 80%, ${lightness}%)`;
    ctx.fillText(char, startX + i * letterSpacing, baseY + jitterY);
  }
}

//////////////