function init() {
    console.log("Let's start coding!");
}
// Endpoint URL van The Dog API
const url = 'https://api.thedogapi.com/v1/breeds';
const apiKey = 'live_ue1OfMCwoonZxd78cGYDnIMulHPRW7CQELlXmAy0gp2sihdmiXiefvnppWsz2sbg';

// Functie om gegevens op te halen van The Dog API
async function getDogBreeds() {
  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': live_ue1OfMCwoonZxd78cGYDnIMulHPRW7CQELlXmAy0gp2sihdmiXiefvnppWsz2sbg
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const breeds = await response.json();

    // Filteren op basis van een specifieke eigenschap, bijvoorbeeld hypoallergene honden
    const hypoallergenicBreeds = breeds.filter(breed => breed.hypoallergenic === 1);

    // Sorteren op levensverwachting
    const sortedBreeds = hypoallergenicBreeds.sort((a, b) => {
      const lifeSpanA = parseInt(a.life_span.split(' ')[0]);
      const lifeSpanB = parseInt(b.life_span.split(' ')[0]);
      return lifeSpanA - lifeSpanB;
    });

    // Print de gesorteerde lijst
    sortedBreeds.forEach(breed => {
      console.log(`Breed: ${breed.name}, Life Span: ${breed.life_span}`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

// Aanroep van de functie
getDogBreeds();


init()