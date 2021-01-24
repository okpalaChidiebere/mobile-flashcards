import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStorageInstance, saveDeckTitle, addCardToDeck } from './storage/appStorage'

export default function App() {

  const [ decks, setDecks ] = useState()

  useEffect(() => {
    (async () => {
      try{
        const decks = await createStorageInstance()
        setDecks({...JSON.parse(decks)})
      }catch(e){
        console.warn("Error createStorageInstance", e)
      }
    })()
  }, [])

  const addNewDeck = async (title) => {
    try{
      const updatedDecks = await saveDeckTitle(title)
      setDecks({
        ...JSON.parse(updatedDecks)
      })
    }catch(e){
      console.warn("Error saveDeckTitle", e)
    }
  }

  const addCardToADeck = async ( title, question, answer ) => {
    try{
      const card = { question, answer }
      const updatedDecks = await addCardToDeck({title, card})
      setDecks({
        ...JSON.parse(updatedDecks)
      })
    }catch(e){
      console.warn("Error addCardToDeck", e)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Current decks: {JSON.stringify(decks)}</Text>
      <TouchableOpacity
        onPress={() => addNewDeck('JavaScript') }
      >
        <Text>Update Decks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
