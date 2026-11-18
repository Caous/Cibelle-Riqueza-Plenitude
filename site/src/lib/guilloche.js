// Rosácea de linhas entrelaçadas (hipotrocoide) gerada por matemática.
export function rosettePaths({ size = 600, curves = 18, R = 5, r = 3, turns = 3, dMin = 0.9, dMax = 4.2, steps = 520 } = {}) {
  const c = size / 2
  const scale = (size / 2) / (R - r + dMax + 0.2)
  const out = []
  for (let k = 0; k < curves; k++) {
    const d = dMin + ((dMax - dMin) * k) / Math.max(1, curves - 1)
    const phase = (k * Math.PI) / curves
    let p = ''
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2 * turns
      const x = (R - r) * Math.cos(t + phase) + d * Math.cos(((R - r) / r) * t)
      const y = (R - r) * Math.sin(t + phase) - d * Math.sin(((R - r) / r) * t)
      p += (i ? 'L' : 'M') + (c + x * scale).toFixed(1) + ' ' + (c + y * scale).toFixed(1)
    }
    out.push(p + 'Z')
  }
  return out
}
