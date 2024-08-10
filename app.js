document.getElementById('search-button2').addEventListener('click', function() {
    const query = document.getElementById('search-bar2').value;
    if (query) {
        fetchNutritionData(query);
    }
});

async function fetchNutritionData(query) {
    const apiKey = 'c8f7a9b1a965a7cf9d45b6d1e649daec';  // Replace with your actual API key
    const appId = 'a2d97c0a';    // Replace with your actual App ID
    const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': appId,
                'x-app-key': apiKey
            },
            body: JSON.stringify({
                query: query,
                timezone: "US/Eastern"
            })
        });

        if (response.ok) {
            const data = await response.json();
            displayResults(data.foods);
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch data. Please check your API key and App ID, or try again later.');
    }
}

function displayResults(foods) {
    const resultsDiv = document.getElementById('results2');
    resultsDiv.innerHTML = '';
    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'result-item';
        foodDiv.innerHTML = `
            <h3>${food.food_name}</h3>
            <p>Calories: ${food.nf_calories}</p>
            <p>Serving Size: ${food.serving_qty} ${food.serving_unit}</p>
            <p>Fat: ${food.nf_total_fat}g</p>
            <p>Carbohydrates: ${food.nf_total_carbohydrate}g</p>
            <p>Protein: ${food.nf_protein}g</p>
        `;
        resultsDiv.appendChild(foodDiv);
    });
}
function calculateTDEE() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = document.getElementById('activity').value;

    let bmr;

    // Calculate BMR using Mifflin-St Jeor Equation
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multiplier
    let activityMultiplier;
    switch (activity) {
        case 'sedentary':
            activityMultiplier = 1.2;
            break;
        case 'lightly_active':
            activityMultiplier = 1.375;
            break;
        case 'moderately_active':
            activityMultiplier = 1.55;
            break;
        case 'very_active':
            activityMultiplier = 1.725;
            break;
        case 'extra_active':
            activityMultiplier = 1.9;
            break;
    }

    const tdee = bmr * activityMultiplier;
    document.getElementById('result').textContent = `Your TDEE is approximately ${tdee.toFixed(2)} calories per day.`;
}

