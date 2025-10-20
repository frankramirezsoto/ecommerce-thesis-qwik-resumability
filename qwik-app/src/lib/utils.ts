export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
