const displayPoke = (imgURL) => {

    const pokeContain = document.getElementById('team-here')
    const newImg = document.createElement('img')
    newImg.src = imgURL
    newImg.classList.add('pokemon')
    pokeContain.appendChild(newImg)
}

const getPokeByName = async (name) => {

    const response2 = await fetch('https://pokeapi.co/api/v2/pokemon/'+name);
    const px = await response2.json();
    return px
}

const getPokeByType = async (type) => {

    const response = await fetch('https://pokeapi.co/api/v2/type/'+type);
    const types = await response.json();
    const id = Math.floor((Math.random() * types.pokemon.length)+1)
    const name = types.pokemon[id].pokemon.name
    let re = getPokeByName(name)
    return re

}

const getPoke = async () => {

    const pokeContain = document.getElementById('team-here')
    pokeContain.innerHTML = ''

    const id = Math.floor((Math.random() * 1024)+1)

    try {
        let pokemonList = [];
        let pokemonIds = new Set();
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id);
        const p1 = await response.json();
        pokemonList.push(p1)
        pokemonIds.add(p1.id);
        const type = p1.types[0].type.name
        while (pokemonList.length < 6) {
            let teamMem = await getPokeByType(type)
            if (!pokemonIds.has(teamMem.id)) {
                pokemonList.push(teamMem);
                pokemonIds.add(teamMem.id);
    }
            
        }

        for (pokemon in pokemonList) {
            let imgURL = pokemonList[pokemon].sprites.front_default
            displayPoke(imgURL)
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

const handleSubmit = (event) => {
    event.preventDefault()
    getPoke()
}

const myForm = document.getElementById('press');
myForm.addEventListener('submit', handleSubmit);