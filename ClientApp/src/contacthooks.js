import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const endpoint = "api/phonebook";

export function useContacts(searchQuery) {
  const [contacts, setContacts] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [query, setQuery] = useState('');

  const setQueryDebounced = useCallback(
    debounce(setQuery, 200, { leading: true, trailing: true }),
    [setQuery]
  );

  useEffect(() => {
    setLoading(true);
    setQueryDebounced(searchQuery);
  }, [setQueryDebounced, searchQuery, setLoading])

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

      const response = await fetch(url, { signal: abortController.signal });
      if (!response.ok) {
        return;
      }

      const contacts = await response.json();
      setContacts(contacts);
      setLoading(false);
    }

    fetchUrl().catch((e) => {
      if (e.name !== "AbortError") {
        setError(e);
      }
    });

    return () => abortController.abort();
  }, [query]);

  return {
    contacts,
    loading,
    error,
  };
}

export function useSaveContact(id) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  const url = id ? `${endpoint}/${id}` : endpoint;

  const save = useCallback(
    async (contactData) => {
      if (loading) {
        return;
      }

      setLoading(true);
      setErrors();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      setLoading(false);

      const data = await response.json();
      console.log("contact", data);

      if (!response.ok && data.errors) {
        setErrors(data.errors);
        return false;
      }

      return true;
    },
    [loading, url]
  );

  return {
    save,
    loading,
    errors,
  };
}
