export function getMonthText(months: number): string {
  let monthsText = 'месяцев';
  if (months === 1) {
    monthsText = 'месяц';
  }
  if (months === 2) {
    monthsText = 'месяца';
  }
  if (months === 3) {
    monthsText = 'месяца';
  }
  if (months === 4) {
    monthsText = 'месяца';
  }
  return monthsText;
}
