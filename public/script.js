document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;
    if (query.trim() === '') {
        alert('Please enter a search query');
        return;
    }

    fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(images => {
            const imageGrid = document.getElementById('imageGrid');
            imageGrid.innerHTML = ''; // Clear previous results
            images.forEach(img => {
                const imgElement = document.createElement('img');
                imgElement.src = img.url;
                imgElement.alt = img.description || 'Image';
                imageGrid.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error:', error));
});
