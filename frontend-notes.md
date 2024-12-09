### Create an API slice to handle the typeahead search:

```
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/mysearchtool' }),
  endpoints: (builder) => ({
    search: builder.query({
      query: (query) => `?q=${query}`, // Query parameter endpoint
    }),
  }),
});

export const { useSearchQuery } = searchApi;
```

### The debouncing happens before calling the useSearchQuery hook, ensuring the hook is only invoked after the debounce delay.

```
import  { useState, useEffect } from 'react';
import { useSearchQuery } from './searchApi'; // Import the RTK Query hook
import { useDebounce } from './useDebounce'; // Reusable debounce hook

const TypeaheadSearch = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300); // 300ms debounce delay
  const { data: results, error, isLoading } = useSearchQuery(debouncedQuery, {
    skip: !debouncedQuery, // Skip query if the debounced value is empty
  });

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching results.</p>}
      <ul>
        {results?.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default TypeaheadSearch;
```

### Debounce hook

```
import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```
