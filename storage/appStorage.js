import AsyncStorage from '@react-native-async-storage/async-storage';
export const DECKS_STORAGE_KEY = 'com.exp.mobile-flashcards:decks'

export const createStorageInstance = async () => {
    //AsyncStorage.clear() //only for testing
    let decks = {}
    decks = await getDecks()

    if(decks !== null){
        console.log("Getting the storage instance")
        return decks
    }else{
        console.log("creating the storage instance")
        await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({...decks}))
        return decks
    }
    
}

export const getDecks = async () => await AsyncStorage.getItem(DECKS_STORAGE_KEY)

export const getDeck = async (id) => {
    const decks =  await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    return decks[id]
}

export const saveDeckTitle = async (title) => {
    const newDeck = {
        [title]: {
            title,
            questions: []
        }
    }
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
    const updatedStorage = await getDecks()
    return updatedStorage
}

export const addCardToDeck = async ({ title, card }) => {

    let currentDecks = await getDecks()
    currentDecks = JSON.parse(currentDecks)
    const updatedDecks = {
        ...currentDecks,
        [title]: {
            ...currentDecks[title],
            questions: [
                ...currentDecks[title].questions,
                {
                    question: card.question,
                    answer: card.answer,
                }
            ]  
        }
    }

    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDecks))
    const updatedStorage = await getDecks()
    return updatedStorage
}