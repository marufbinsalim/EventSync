import useDebouncedAddressSuggestion from "@/hooks/useDebouncedAddressSuggestion";
import { CircleDashed, SearchCheck, XCircleIcon } from "lucide-react";
import { useState } from "react";

export default function AddressInput({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
}) {
  const [address, setAddress] = useState<string>("");

  const { suggestions, setSuggestions, loading, setLoading } =
    useDebouncedAddressSuggestion(address, selectedAddress);

  return (
    <div className="relative w-[max-content] max-w-screen bg-slate-800 flex justify-center">
      <div className="flex items-center gap-2 w-[full] flex-wrap">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-[4px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-600 text-white"
          placeholder="Enter address"
        />
        <button
          className="p-2 rounded-md bg-slate-700"
          onClick={() => {
            setSelectedAddress(address);
            setSuggestions([]);
            setLoading(false);
          }}
        >
          <SearchCheck color="white" />
        </button>
        <button
          className="p-2 rounded-md bg-slate-700"
          onClick={() => {
            setAddress("");
            setSelectedAddress("");
            setLoading(false);
            setSuggestions([]);
          }}
        >
          <XCircleIcon color="white" />
        </button>
      </div>

      {(loading || suggestions.length > 0) && (
        <div className="absolute z-30 top-[120%] left-0 w-[100%] bg-slate-700 rounded-md shadow-lg p-2">
          {loading && (
            <div className="flex justify-center w-full p-2 border-b cursor-pointer border-sate-500 last:border-0 hover:bg-slate-800 bg-slate-700 text-slate-200">
              <CircleDashed className="w-6 h-6 animate-spin" />
            </div>
          )}

          {suggestions &&
            suggestions.length > 0 &&
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 border-b cursor-pointer border-slate-500 hover:bg-slate-800 bg-slate-700 text-slate-200"
                onClick={() => {
                  setAddress(suggestion.display_name);
                  setSelectedAddress(suggestion.display_name);
                  setSuggestions([]);
                  setLoading(false);
                }}
              >
                {suggestion.display_name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
