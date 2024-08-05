const apiKey = 'live_ue1OfMCwoonZxd78cGYDnIMulHPRW7CQELlXmAy0gp2sihdmiXiefvnppWsz2sbg';
const url = 'https://api.thedogapi.com/v1/breeds';

// Fetch data van The Dog API
async function fetchBreeds() {
  const response = await fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  });
  const breeds = await response.json();
  return breeds;
}

// Filter en sorteer de data //
function filterAndSortBreeds(breeds, filterValue, sortValue) {
  let filteredBreeds = breeds;

  // Filteren op type //
  if (filterValue) {
    filteredBreeds = breeds.filter(breed => breed.breed_group && breed.breed_group.includes(filterValue));
  }

  // Sorteren op gewicht //
  if (sortValue === 'minWeight') {
    filteredBreeds.sort((a, b) => parseInt(a.weight.imperial) - parseInt(b.weight.imperial));
  } else if (sortValue === 'maxWeight') {
    filteredBreeds.sort((a, b) => parseInt(b.weight.imperial) - parseInt(a.weight.imperial));
  }

  
  return filteredBreeds;
}

// Weergeven van de resultaten //
function displayBreeds(breeds) {
  const breedList = document.getElementById('breedList');
  breedList.innerHTML = '';
  breeds.forEach(breed => {
    const breedItem = document.createElement('div');
    breedItem.className = 'breed-item';
    breedItem.innerHTML = `
      <h3>${breed.name}</h3>
      <p>Gewicht: ${breed.weight.imperial}</p>
      <p>Type: ${breed.breed_group || 'N/A'}</p>
      <p>Afkomst:
    `;
    breedList.appendChild(breedItem);
  });
}

// Initialiseer de dropdown menu's //
function initializeDropdowns(breeds) {
  const typeFilter = document.getElementById('typeFilter');
  const breedGroups = [...new Set(breeds.map(breed => breed.breed_group).filter(Boolean))];
  breedGroups.forEach(group => {
    const option = document.createElement('option');
    option.value = group;
    option.textContent = group;
    typeFilter.appendChild(option);
  });
}

// Event listeners voor filteren en sorteren //
document.getElementById('typeFilter').addEventListener('change', async (e) => {
  const filterValue = e.target.value;
  const sortValue = document.getElementById('sort').value;
  const breeds = await fetchBreeds();
  const filteredAndSortedBreeds = filterAndSortBreeds(breeds, filterValue, sortValue);
  displayBreeds(filteredAndSortedBreeds);
});

document.getElementById('sort').addEventListener('change', async (e) => {
  const sortValue = e.target.value;
  const filterValue = document.getElementById('typeFilter').value;
  const breeds = await fetchBreeds();
  const filteredAndSortedBreeds = filterAndSortBreeds(breeds, filterValue, sortValue);
  displayBreeds(filteredAndSortedBreeds);
});

// Initialiseer de pagina
async function init() {
  const breeds = await fetchBreeds();
  initializeDropdowns(breeds);
  displayBreeds(breeds);
}

init();
