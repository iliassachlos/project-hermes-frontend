import React, {useState} from 'react';
import {Button, Input} from "@nextui-org/react";
import axios from 'axios';
import SearchbarHelpModal from "@/components/shared/modals/searchbar-help-modal";
import SavedQueriesModal from "@/components/feed/saved-queries-modal";
import {useAuth} from "@/context/auth-context";

function SearchBar({onFilteredArticles, onFetchAllArticles, onSearch}) {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearchbarHelpModalOpen, setIsSearchbarHelpModalOpen] = useState(false);
    const [isShowSavedQueriesModalOpen, setIsShowSavedQueriesModalOpen] = useState(false);

    const {userInfo} = useAuth()

    const suggestions = ['title:', 'content:', 'time:', 'image:', 'source:', 'category:', 'sentimentScore'];

    const fieldMapping = {
        'title': 'title',
        'content': 'content',
        'time': 'time',
        'image': 'image',
        'source': 'source',
        'category': 'category',
        'sentimentscore': 'sentimentScore' // Ensure the lowercase key maps to the correctly cased value
    };

    function parseQuery(query) {
        const keywords = {must: [], should: [], must_not: []};
        let currentCondition = 'must';

        //Define numeric fields
        const numericFields = new Set(['sentimentscore']);

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
                const fieldName = fieldMapping[keyword] || keyword;
                // Check if the field should be numeric and convert the value if needed
                const conditionValue = numericFields.has(fieldName) ? parseFloat(value) : value;
                const condition = { [fieldName]: conditionValue };
                keywords[currentCondition].push(condition);
            }
        });

        return keywords;
    }

    async function handleSearch() {
        try {
            const body = parseQuery(query);
            console.log(body)
            const response = await axios.post('http://localhost:8083/api/elastic/search', body);
            onFilteredArticles(response.data);
            onSearch(body);
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

    function searchbarHelpModalHandler() {
        setIsSearchbarHelpModalOpen(!isSearchbarHelpModalOpen)
    }

    async function saveQueryHandler() {
        try {
            const userId = userInfo.id
            await axios.post('http://localhost:8083/api/users/query/add', {
                id: userId,
                query: query
            })
        } catch (error) {
            console.log(error)
        }
    }

    function showQueryModalHandler() {
        setIsShowSavedQueriesModalOpen(!isShowSavedQueriesModalOpen)
    }

    function setSavedQueryHandler(query) {
        setQuery(query)
        setIsShowSavedQueriesModalOpen(false)
    }


    return (
        <>
            <div className="flex flex-col justify-between items-center my-2 mx-4 md:mx-44 lg:mx-32 2xl:mx-[450px]">
                <div className="flex justify-center items-center">
                    <Button
                        className="p-5 mx-2"
                        variant="flat"
                        radius="md"
                        size="sm"
                        onClick={searchbarHelpModalHandler}
                    >
                        Need Help?
                    </Button>
                    <Input
                        className="md:w-[450px] lg:w-[650px] 2xl:w-[750px]"
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
                    <div className="md:flex gap-2 mx-2">
                        <Button
                            className="my-1 md:my-0"
                            isDisabled={query.length < 4}
                            variant="flat"
                            color="secondary"
                            radius="md"
                            size="sm"
                            onClick={saveQueryHandler}
                        >
                            Save query
                        </Button>
                        <Button
                            className="my-1 md:my-0"
                            variant="flat"
                            radius="md"
                            size="sm"
                            onClick={showQueryModalHandler}
                        >
                            Show Queries
                        </Button>
                    </div>
                </div>
            </div>
            {showSuggestions && (
                <div className="absolute top-36 z-40 bg-white dark:bg-black rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onMouseDown={(e) => {
                                e.preventDefault();
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
            {isSearchbarHelpModalOpen &&
                <SearchbarHelpModal
                    onSearchbarHelpHandler={searchbarHelpModalHandler}
                    isOpen={isSearchbarHelpModalOpen}
                />
            }
            {isShowSavedQueriesModalOpen &&
                <SavedQueriesModal
                    onshowQueryModalHandler={showQueryModalHandler}
                    isOpen={isShowSavedQueriesModalOpen}
                    onsetSavedQueryHandler={setSavedQueryHandler}
                />
            }
        </>
    )

}

export default SearchBar;