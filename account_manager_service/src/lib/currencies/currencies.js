import currencies from "./currencies.json" assert{type: 'json'};

export function convertCurrencies(value, from, to) {
  if (from === to) return value;

  const fromCur = currencies.findIndex((d) => d.code == from);
  const toCur = currencies.findIndex((d) => d.code == to);

  const fromInIdr = value * currencies[fromCur].rate_to_IDR;
  const result = fromInIdr / currencies[toCur].rate_to_IDR;

  return result.toFixed(2);
}


export function findCurrency(currency) {
  const currencyIdx = currencies.findIndex((d) => d.code === currency);

  console.log(currencyIdx, currency);

  return currencyIdx !== -1 ? currencies[currencyIdx] : null;
}