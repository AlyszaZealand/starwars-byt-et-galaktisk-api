const characterService = require("../service/characterService");

async function getAllCharacters(req, res){
    try {
        const characters = await characterService.handleGetAllCharacters()
        res.status(200).json(characters);
    } catch (err) {
        res.status(500).json({error: 'Kunne ikke læse karakterer.'})
    }
}


async function addNewCharacter(req, res){
    try {
        const result = await characterService.handleAddNewCharacter(req.body);
        if(result.error){
            return res.status(400).json({error: result.error});
        }
        res.status(201).json(result.data);
    } catch (err) {
        console.error("Crash i addNewCharacter:", err);
        res.status(500).json({error: 'Kunne ikke tilføje karakter.'})
    }
}

async function deleteCharacter(req, res){
    try {
        await characterService.handleDeleteCharacterById(req.params.id);
        res.status(204).json({ message: 'Karakteren blev slettet'})
    } catch (err) {
        console.log("Crash i deleteCharacter:", err);
        res.status(500).json({ error: 'Kunne ikke slette karakteren'})
    }
}


async function getCharacterById(req, res) {
    try {
        const id = Number(req.params.id);
        const character = await characterService.handleGetCharacterById(id);
        if (!character) {
            return res.status(404).json({ error: character.error });
        }
        res.status(200).json(character);
    } catch (error) {
        console.error(error);
        res.status(500).json({"error": "Server Fejl"});
    }
}

async function updateCharacter(req, res) {
    try {
        const id = Number(req.params.id)
        const updatedCharacter = await characterService.handleUpdateCharacterById(id, req.body);
        if (!updatedCharacter) {
            return res.status(404).json({ error: updatedCharacter.error });
        }
        res.status(200).json(updatedCharacter);
    } catch (err) {
        res.status(500).json({ error: 'Kunne ikke opdatere karakter.' });
    }
}


module.exports = {getAllCharacters, addNewCharacter, deleteCharacter, getCharacterById, updateCharacter}