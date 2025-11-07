export function generateAccountNo() {
  const part1 = Math.floor(1000 + Math.random() * 9000); // 4 digits
  const part2 = Math.floor(100000 + Math.random() * 900000); // 6 digits
  return `SVLT-${part1}-${part2}`;
}
