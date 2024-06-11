import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
export default function RangeDatePicker({
  value,
  setValue,
}: {
  value: DateValueType;
  setValue: (value: DateValueType) => void;
}) {
  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-2 text-white w-max">
      <p className="text-lg">Select Start & End Date</p>
      <Datepicker
        containerClassName="bg-slate-600 p-1 px-1 rounded-md relative flex w-max text-white border border-gray-300"
        inputClassName="px-0 bg-slate-600 border-none outline-none"
        toggleClassName="bg-slate-600 text-white"
        placeholder={"Start and End Date"}
        showShortcuts={false}
        showFooter={false}
        value={value}
        displayFormat={"DD/MM/YYYY"}
        minDate={new Date(Date.now())}
        startFrom={new Date(Date.now())}
        onChange={(newValue: DateValueType) => handleValueChange(newValue)}
      />
    </div>
  );
}
