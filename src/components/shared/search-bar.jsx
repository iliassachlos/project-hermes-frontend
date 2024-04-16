'use client'
import React, {useState} from 'react';
import {Input} from "@nextui-org/react";
import axios from 'axios';

function SearchBar({onFilteredArticles, onFetchAllArticles}) {
    const [query, setQuery] = useState('');

    function parseQuery(query) {
        const keywords = { must: [], should: [], must_not: [] };
        let currentCondition = 'must';

        query.split(' ').forEach(term => {
            if (term.toLowerCase() === 'and') {
                currentCondition = 'must'; // Set the current condition to 'must'
                return;
            }
            if (term.toLowerCase() === 'or') {
                currentCondition = 'should'; // Set the current condition to 'should'
                return;
            }
            if (term.toLowerCase() === 'not') {
                currentCondition = 'must_not'; // Set the current condition to 'must_not'
                return;
            }

            const [field, value] = term.split(':');
            const keyword = field ? field.toLowerCase() : 'content';
            if (value) {
                const condition = { [keyword]: value };
                keywords[currentCondition].push(condition);
            }
        });

        return keywords;
    }


    async function handleSearch() {
        try {
            const body = parseQuery(query);
            console.log('body:',body)
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
            } else {
                onFetchAllArticles()
            }
        }
    }


    return (
        <Input
            className="mx-4 md:mx-44 lg:mx-72 2xl:mx-[700px] my-2"
            type="text"
            label="Search.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="flat"
            onClear={() => setQuery('')}
            isClearable
        />
    )
}

export default SearchBar;
