const path = require('path');
const fs = require('fs-extra');

const DATA_PATH = path.join(__dirname,'..','data','characters.json')


async function handleGetAllCharacters() {
    return await fs.readJson(DATA_PATH);
}

async function handleGetCharacterById(id) {
    const currentCharacters = await handleGetAllCharacters();
    const searchedCharacter = currentCharacters.find(searchedCharacter => searchedCharacter.id === id);

    if (isNaN(id)) {
        return { error: 'Ugyldigt id.' };
    }
    if (id < 0) {
        return  {error: "Bruger id kan ikke være negativ"};
    }
    if (!searchedCharacter) {
        return { error: "Kunne ikke finde karakter." };
    }

    return searchedCharacter;
}

async function handleAddNewCharacter(characterData) {
    const name = characterData.name;
    const role = characterData.role;
    const planet = characterData.planet;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return {error: "navn skal være en string og indeholde mindst 2 tegn"};
    }

    const validRoles = ['jedi', 'sith', 'rebel', 'smuggler'];

    if (!role || typeof role !== 'string' || !validRoles.includes(role.trim().toLowerCase())) {
        return {error: "role skal være en af: jedi, sith, rebel eller smuggler"};
    }

    if (!planet || typeof planet !== 'string' || planet.trim().length === 0) {
        return {error: "planet skal være en string og den må ikke være tom"};
    }

    const currentCharacters = await handleGetAllCharacters();

    let newId = 5;
    if (currentCharacters.length > 0) {
        const highestId = Math.max(...currentCharacters.map(character => character.id))
        newId = highestId + 1;
    }

    const newCharacter = {
        id: newId,
        name: name.trim(),
        role: role.trim().toLowerCase(),
        planet: planet.trim()
    };

    currentCharacters.push(newCharacter);
    await fs.writeJson(DATA_PATH, currentCharacters);
    return {data: newCharacter}
}

async function handleUpdateCharacterById(id, updateData) {
    const currentCharacters = await handleGetAllCharacters();
    const characterIndex = currentCharacters.findIndex(character => character.id === id);
    const name = updateData.name;
    const role = updateData.role;
    const planet = updateData.planet;

    if (characterIndex === -1) {
        return {error: "kunne ikke finde character"};
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return {error: "navn skal være en string og indeholde mindst 2 tegn"};
    }

    const validRoles = ['jedi', 'sith', 'rebel', 'smuggler'];
    if (!role || typeof role !== 'string' || !validRoles.includes(role.trim().toLowerCase())) {
        return {error: "role skal være en af: jedi, sith, rebel eller smuggler"};
    }

    if (!planet || typeof planet !== 'string' || planet.trim().length === 0) {
        return {error: "planet skal være en string og den må ikke være tom"};
    }

    const existingCharacter = currentCharacters[characterIndex];

    existingCharacter.name = updateData.name;
    existingCharacter.planet = updateData.planet;
    existingCharacter.role = updateData.role;

    await fs.writeJson(DATA_PATH, currentCharacters, {spaces: 2});
    return existingCharacter;
}

async function handleDeleteCharacterById(paramId) {
    const id = Number(paramId)
    const currentCharacters = await handleGetAllCharacters();
    const characterIndex = currentCharacters.findIndex(character => character.id === id);

    if (characterIndex === -1) {
        return null;
    }

    currentCharacters.splice(characterIndex, 1);
    await fs.writeJson(DATA_PATH, currentCharacters);
    return true;
}




module.exports = {handleGetAllCharacters, handleGetCharacterById, handleAddNewCharacter, handleUpdateCharacterById, handleDeleteCharacterById}
