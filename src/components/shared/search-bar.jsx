import React, {useState} from 'react';
import {Input} from "@nextui-org/react";
import axios from 'axios';

function SearchBar({onFilteredArticles, onFetchAllArticles}) {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions = ['title:', 'content:', 'time:', 'image:', 'source:', 'category:'];

    function parseQuery(query) {
        const keywords = {must: [], should: [], must_not: []};
        let isFirstKeyword = true;
        let currentCondition = 'should';

        query.split(' ').forEach(term => {
            if (term.toLowerCase() === 'and' && isFirstKeyword) {
                keywords.must[0] = keywords.should[0]; // Changing the 1st keyword from should to must
                keywords.should = []; // Clearing should for the next keywords
                currentCondition = 'must'
                isFirstKeyword = false;
                return;
            }
            if (term.toLowerCase() === 'and') {
                currentCondition = 'must'; // Set the current condition to 'must'
                isFirstKeyword = false;
                return;
            }
            if (term.toLowerCase() === 'or') {
                currentCondition = 'should'; // Set the current condition to 'should'
                isFirstKeyword = false;
                return;
            }
            if (term.toLowerCase() === 'not') {
                currentCondition = 'must_not'; // Set the current condition to 'must_not'
                isFirstKeyword = false;
                return;
            }

            const [field, value] = term.split(':');
            const keyword = field ? field.toLowerCase() : 'content';
            if (value) {
                const condition = {[keyword]: value};
                keywords[currentCondition].push(condition);
            }
        });

        return keywords;
    }

    async function handleSearch() {
        try {
            const body = parseQuery(query);
            const response = await axios.post('http://localhost:8083/api/elastic/search', body);
            onFilteredArticles(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            if (query.length > 0) {
                handleSearch();
                setShowSuggestions(false);
            } else {
                onFetchAllArticles();
                setShowSuggestions(true);
            }
        }
    }

    return (
        <>
            <Input
                className="mx-4 md:mx-44 lg:mx-72 2xl:mx-[700px] my-2"
                type="text"
                label="Search.."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    const lowerCaseValue = e.target.value.toLowerCase();
                    if (e.target.value === '' || lowerCaseValue.includes('and') || lowerCaseValue.includes('or') || lowerCaseValue.includes('not')) {
                        setShowSuggestions(true)
                    } else {
                        setShowSuggestions(false)
                    }
                }}
                onKeyPress={handleKeyPress}
                variant="flat"
                onClear={() => {
                    setQuery('')
                    setShowSuggestions(true)
                }}
                isClearable
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
            />
            {showSuggestions && (
                <div className="absolute top-36 z-40 bg-white dark:bg-black rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onMouseDown={(e) => {
                                e.preventDefault(); // Prevents the input from losing focus
                                const clickedSuggestion = suggestion
                                setQuery(prevQuery => prevQuery + ' ' + clickedSuggestion);
                                setShowSuggestions(false);
                            }}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-500"
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default SearchBar;
