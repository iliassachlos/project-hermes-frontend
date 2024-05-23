import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Chip} from "@nextui-org/react";

function FacetList({facets, onFacetClick, originalQuery}) {
    // Helper function to check if a facet is selected
    const isSelected = (facet, type) => {
        for (let i = 0; i < originalQuery.must.length; i++) {
            if (originalQuery.must[i][type] === facet.toLowerCase()) {
                return true;
            }
        }
        return false;
    };

    return (
        <div className="facet-list w-64 mr-4 p-4 rounded-lg gap-2 flex-col">
            <h2 className="text-lg font-bold mb-2">Sources:</h2>
            {facets.sourceFacets.map(([facet, count], index) => (
                <div key={index} onClick={() => onFacetClick(facet, 'source')} className="mb-1 flex justify-between">
                    <Chip color={isSelected(facet, 'source') ? 'secondary' : 'default'}>
                        <span className="font-medium cursor-pointer">{facet} : {count}</span>
                    </Chip>
                </div>
            ))}
            <h2 className="text-lg font-bold mb-2 mt-4">Categories:</h2>
            {facets.categoryFacets.map(([facet, count], index) => (
                <div key={index} onClick={() => onFacetClick(facet, 'category')} className="mb-1 flex justify-between">
                    <Chip color={isSelected(facet, 'category') ? 'secondary' : 'default'}>
                        <span className="font-medium cursor-pointer">{facet} : {count}</span>
                    </Chip>
                </div>
            ))}
            <h2 className="text-lg font-bold mb-2 mt-4">Sentiment Score:</h2>
            {facets.sentimentFacets.map(([facet, count], index) => (
                <div key={index} onClick={() => onFacetClick(facet, 'sentimentScore')} className="mb-1 flex justify-between">
                    <Chip color={isSelected(facet, 'sentimentScore') ? 'secondary' : 'default'}>
                        <span className="font-medium cursor-pointer">Score of {facet} : {count}</span>
                    </Chip>
                </div>
            ))}
        </div>
    );
}

export default FacetList;
