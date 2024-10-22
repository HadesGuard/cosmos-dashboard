import { IAmount } from "../constants/type";

export const shortenString = (str: string, charDisplay: number) => {
  if (!str?.length || str?.length < charDisplay * 2 + 1) return str;
  return `${str.slice(0, charDisplay)}...${str.slice(-charDisplay)}`;
};

export function formatNumber(num: number) {
  if (!num || typeof num !== "number") return num;
  const roundedNum = num.toFixed(2);
  const formattedNum = roundedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedNum;
}

export const displayCoin = (deposit: IAmount, decimal: number = 6) => {
  const amount = Math.round(Number(deposit.amount) / 10 ** (decimal + 6));
  let symbol;
  if (deposit.denom.startsWith("u")) {
    symbol = deposit.denom.slice(1).toUpperCase();
  } else {
    symbol = deposit.denom.toUpperCase();
  }
  return `${amount.toLocaleString()} ${symbol}`;
};
