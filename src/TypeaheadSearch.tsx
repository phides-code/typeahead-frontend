import { useState } from 'react';
import { useDebounce } from './app/hooks';
import { useSearchItemsQuery } from './features/searchItems/searchItemsApiSlice';

const TypeaheadSearch = () => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);
    const { data, error, isLoading } = useSearchItemsQuery(debouncedQuery, {
        skip: !debouncedQuery,
    });

    return (
        <div>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Type to search...'
            />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching results.</p>}
            <ul>
                {data?.data?.map((result) => (
                    <li key={result.id}>{result.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default TypeaheadSearch;
