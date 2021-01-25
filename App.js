import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { createStorageInstance, saveDeckTitle, addCardToDeck } from './storage/appStorage'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { DECK_LIST_TAB, ADD_DECK_TAB } from './utils/constants'
import { icons, colorPrimary } from './utils/colors'
import AddDeckPage from './components/AddDeckPage'
import DeckListPage from './components/DeckListPage'


const DATA = [
  {
    title: 'First Item',
    numberOfCards: 3,
  },
  {
    title: 'Second Item',
    numberOfCards: 2,
  },
  {
    title: 'Second Item',
    numberOfCards: 2,
  },
  {
    title: 'Second Item',
    numberOfCards: 2,
  },
  {
    title: 'Second Item',
    numberOfCards: 2,
  },
];

const Tabs =
  Platform.OS === 'ios'
    ? createBottomTabNavigator() //we show the tab at the bottom for android
    : createMaterialTopTabNavigator() //we show normal tab for androdi at the top of the screen


export default function App() {

  const [ decks, setDecks ] = useState()

  const TabNav = () => (
    <Tabs.Navigator
        initialRouteName={DECK_LIST_TAB}
        tabBarOptions={{
            header: null,
            showIcon: false,
            activeTintColor: Platform.OS === "ios" ? colorPrimary : icons,
            style: {
                height: 80,
                backgroundColor: Platform.OS === "ios" ? icons : colorPrimary,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }}
    >
      <Tabs.Screen name={DECK_LIST_TAB} children={ ()=> <DeckListPage decks={DATA}/> }/>
      <Tabs.Screen name={ADD_DECK_TAB} children={ () => <AddDeckPage handleAddnewDeck={addNewDeck}/> } />
    </Tabs.Navigator>
  )

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
      <NavigationContainer>
        <View style={//give space for status bar
        {height: 50}}/>
        <TabNav />
      </NavigationContainer>
      <DeckListPage decks={DATA}/>
    </View>
  );
}
//   <AddDeckPage handleAddnewDeck={addNewDeck}/> <DeckListPage decks={DATA}/>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
