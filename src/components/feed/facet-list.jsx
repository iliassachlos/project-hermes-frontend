import React from 'react'

function FacetList({facets, onFacetClick}) {
    return (
        <div className="facet-list w-64 mr-4 p-4 rounded-lg cursor-pointer">
            <h2 className="text-lg font-bold mb-2">Sources:</h2>
            {facets.sourceFacets.map(([facet, count], index) => (
                <div key={index} onClick={() => onFacetClick(facet, 'source')} className="mb-1">
                    <span className="font-medium">{facet}:</span> {count}
                </div>
            ))}
            <h2 className="text-lg font-bold mb-2 mt-4 cursor-pointer">Categories:</h2>
            {facets.categoryFacets.map(([facet, count], index) => (
                <div key={index} onClick={() => onFacetClick(facet, 'category')} className="mb-1">
                    <span className="font-medium">{facet}:</span> {count}
                </div>
            ))}
        </div>
    );
}

export default FacetList;