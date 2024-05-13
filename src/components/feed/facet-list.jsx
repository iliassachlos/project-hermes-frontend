import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

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
        <div className="facet-list w-64 mr-4 p-4 rounded-lg cursor-pointer">
            <h2 className="text-lg font-bold mb-2">Sources:</h2>
            {facets.sourceFacets.map(([facet, count], index) => (
                <div key={index} onClick={() => onFacetClick(facet, 'source')} className="mb-1 flex justify-between">
                    <span className="font-medium">{facet}: {count}</span>
                    {isSelected(facet, 'source') && <FontAwesomeIcon className="text-white" icon={faCheck}/>}
                </div>
            ))}
            <h2 className="text-lg font-bold mb-2 mt-4 cursor-pointer">Categories:</h2>
            {facets.categoryFacets.map(([facet, count], index) => (
                <div key={index} onClick={() => onFacetClick(facet, 'category')} className="mb-1 flex justify-between">
                    <span className="font-medium">{facet}: {count}</span>
                    {isSelected(facet, 'category') && <FontAwesomeIcon className="text-white" icon={faCheck}/>}
                </div>
            ))}
        </div>
    );
}

export default FacetList;
