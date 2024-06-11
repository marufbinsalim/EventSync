import { useEffect, useState } from "react";

interface Suggestion {
  display_name: string;
}

function useDebouncedAddressSuggestion(
  address: string, // the actual state bound to the input field
  selectedAddress: string // the state to be updated when a suggestion is selected
) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedAddress, setDebouncedAddress] = useState(address);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAddress(address);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [address]);

  // Fetch suggestions based on debounced address
  useEffect(() => {
    // If the input is empty or the address is already selected, don't fetch suggestions
    if (debouncedAddress.trim() === "" || address === selectedAddress) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAddress, selectedAddress]);

  return { suggestions, setSuggestions, loading, setLoading };
}

export default useDebouncedAddressSuggestion;
