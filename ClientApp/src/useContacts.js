import { useState, useEffect } from "react";

const endpoint = "api/phonebook";

export default function useContacts(query) {
  const [contacts, setContacts] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setError();

    if (!query) {
      setLoading();
      setContacts();
      return;
    }

    const url = `${endpoint}?query=${encodeURIComponent(query)}`;
    const abortController = new AbortController();

    async function fetchUrl() {
      setLoading(true);

      const response = await fetch(url, { signal: abortController.signal })
      if (!response.ok) {
        
        return;
      }

      const contacts = await response.json();
      setContacts(contacts);
      setLoading(false);
    }

    fetchUrl().catch(e => {
      if (e.name !== "AbortError") {
        setError(e)
      }
    })

    return () => abortController.abort();
  }, [query]);

  return {
    contacts,
    loading,
    error
  };
}
