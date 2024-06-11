import useDebouncedAddressSuggestion from "@/hooks/useDebouncedAddressSuggestion";
import { CircleDashed } from "lucide-react";
import { useState } from "react";

export default function AddressInput() {
  const [address, setAddress] = useState<string>("");
  const { suggestions, loading, setSuggestions } =
    useDebouncedAddressSuggestion(address);

  return (
    <div className="relative w-[max-content] p-2 bg-black">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter address"
      />

      <div className="absolute w-full mt-2 bg-white rounded-md shadow-lg">
        {loading && (
          <div className="flex justify-center w-full p-2 border-b border-gray-200 cursor-pointer last:border-0 hover:bg-gray-100">
            <CircleDashed className="w-6 h-6 animate-spin" />
          </div>
        )}

        {suggestions &&
          suggestions.length > 0 &&
          suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 border-b border-gray-200 cursor-pointer last:border-0 hover:bg-gray-100"
            >
              {suggestion.properties.display_name}
            </div>
          ))}
      </div>
    </div>
  );
}
