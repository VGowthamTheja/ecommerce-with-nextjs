import { useAppState } from "@/context/state";
import { Select, SelectItem } from "@nextui-org/react";
import { getAllISOCodes, getAllInfoByISO } from "iso-country-currency";
import React from "react";

const CountryMap = () => {
  const { state, setState } = useAppState();
  const handleChange = (keys: any): any => {
    const currency = keys.currentKey;
    setState((prevState) => ({
      ...prevState,
      currency,
    }));
  };
  const allCurrencies = getAllISOCodes();
  return (
    <Select
      className="max-w-xs text-white"
      onSelectionChange={handleChange}
      labelPlacement="outside-left"
      value={getAllInfoByISO(state.currency).countryName}
      aria-label="Select a currency"
    >
      {allCurrencies.map((currency, index) => (
        <SelectItem key={currency.iso} value={currency.symbol}>
          {currency.countryName}
        </SelectItem>
      ))}
    </Select>
  );
};

export default CountryMap;
