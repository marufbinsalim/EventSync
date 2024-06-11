import { useEffect, useState } from "react";

interface Suggestion {
  display_name: string;
}

function useDebouncedAddressSuggestion(address: string, debounceTime = 300) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedAddress, setDebouncedAddress] = useState(address);

  // Debounce the address input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAddress(address);
    }, debounceTime); // Adjust the debounce delay as needed (300ms here)

    return () => {
      clearTimeout(handler);
    };
  }, [address, debounceTime]);

  // Fetch suggestions based on debounced address
  useEffect(() => {
    if (debouncedAddress.trim() === "") {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${debouncedAddress}&polygon_geojson=1&limit=5&format=jsonv2`
    )
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
        setLoading(false);
      })
      .catch(() => {
        setSuggestions([]);
        setLoading(false);
      });
  }, [debouncedAddress]);

  return { suggestions, loading, setSuggestions, setLoading };
}

export default useDebouncedAddressSuggestion;
