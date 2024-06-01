document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log("Search form submitted");

            const query = document.getElementById('searchInput').value;
            const searchType = document.getElementById('searchType').value;

            console.log(`Query: ${query}, Search Type: ${searchType}`);

            try {
                const response = await fetch(`/search/${searchType}?query=${encodeURIComponent(query)}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                
                const searchData = await response.json();
                console.log('Search data:', searchData); // Debugging log
                
                displaySearchResults(searchData);
            } catch (error) {
                console.error('Error fetching search results:', error.message);
                displayError('Failed to fetch search results. Please try again later.');
            }
        });
    } else {
        console.error('Search form not found');
    }
});

function displaySearchResults(searchData) {
    const searchResultsList = document.getElementById('searchResultsList');
    if (searchResultsList) {
        searchResultsList.innerHTML = '';

        if (Array.isArray(searchData)) {
            searchData.forEach(result => {
                const listItem = document.createElement('li');
                const profileLink = document.createElement('a');
                profileLink.textContent = result.name; // Assuming the property to display is 'name'
                profileLink.href = `/users/${result._id}`; // Assuming the user ID is stored in the '_id' field
                listItem.appendChild(profileLink);
                searchResultsList.appendChild(listItem);
            });
        } else {
            console.error('Expected an array of search results, but received:', searchData);
        }
    } else {
        console.error('Search results list not found');
    }
}

function displayError(errorMessage) {
    alert(errorMessage);
}
