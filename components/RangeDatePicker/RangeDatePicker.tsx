import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
export default function RangeDatePicker() {
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-2 text-white w-max">
      <p className="text-lg">Select a Range of Date</p>
      <Datepicker
        containerClassName="bg-slate-600  p-2 rounded-md relative flex w-max text-white"
        inputClassName="px-4 bg-slate-600 border-none outline-none"
        toggleClassName="bg-slate-600 text-white"
        placeholder={"Start and End Date"}
        showShortcuts={false}
        showFooter={false}
        value={value}
        displayFormat={"DD/MM/YYYY"}
        startFrom={new Date(Date.now())}
        onChange={(newValue: DateValueType) => handleValueChange(newValue)}
      />
    </div>
  );
}
