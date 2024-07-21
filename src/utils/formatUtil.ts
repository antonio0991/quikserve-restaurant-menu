export const formatCurrency = (value: number): string =>
  value.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  });
