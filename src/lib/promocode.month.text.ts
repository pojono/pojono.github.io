export function getMonthText(months: number): string {
  let monthsText = 'месяцев';
  if (months === 1) {
    monthsText = 'месяц';
  }
  if (months === 3) {
    monthsText = 'месяца';
  }
  return monthsText;
}
