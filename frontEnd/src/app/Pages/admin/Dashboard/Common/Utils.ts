export const formatNumberValue = (value: any, index: number): string => {
  if (value >= 1000) return `${value / 1000}K`;
  else if (value >= 1000000) return `${value / 1000000}M`;
  return value as string;
};