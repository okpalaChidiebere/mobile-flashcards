import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { createStorageInstance, saveDeckTitle, addCardToDeck } from './storage/appStorage'
import { DecksProvider } from './storage/DecksContext'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { DECK_LIST_TAB, ADD_DECK_TAB, DECK_DETAILS_STACK, 
  HOME_STACK, ADD_CARD_STACK, START_QUIZZ_STACK } from './utils/constants'
import { icons, colorPrimary, colorLightPrimary } from './utils/colors'
import AddDeckPage from './components/AddDeckPage'
import DeckListPage from './components/DeckListPage'
import AddCard, { AddCardNavigationOptions } from './components/AddCard'
import DeckDetails, { DeckDetailsNavigationOptions } from './components/DeckDetails'
import { createStackNavigator } from '@react-navigation/stack'
import QuizzPage, { QuizzPageNavigationOptions } from './components/QuizzPage'
import Constants from "expo-constants"
import { setLocalNotification } from './utils/notifications'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


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
            indicatorStyle: { //for material-top-tab-navigator. Look at the commit info for more details
              backgroundColor: colorLightPrimary },
            style: {
                height: 60, //had to reduce the height ecause there is no icons
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
      <Tabs.Screen name={DECK_LIST_TAB} component={DeckListPage}/>
      <Tabs.Screen name={ADD_DECK_TAB} component={AddDeckPage} />
    </Tabs.Navigator>
  )

  const Stack = createStackNavigator()
  const MainNavigator = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name={HOME_STACK}
          component={//we render the TabNav which renders the History and AddEntry Components which is our HomePage
            TabNav}
          options={ //No header styling for ths HomePage. We already have Tabs as Header in the HomePage
            {headerShown: false}}
        />
        <Stack.Screen
          name={DECK_DETAILS_STACK}
          component={DeckDetails}
          options={DeckDetailsNavigationOptions}
        />
        <Stack.Screen
          name={ADD_CARD_STACK}
          component={AddCard}
          options={AddCardNavigationOptions}
        />
        <Stack.Screen
          name={START_QUIZZ_STACK}
          component={QuizzPage}
          options={QuizzPageNavigationOptions}
        />
    </Stack.Navigator>
  )

  useEffect(() => {
    (async () => {
      try{
        const decks = await createStorageInstance()
        setDecks({...JSON.parse(decks)})
        setLocalNotification() //schedule initial notification
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
    <DecksProvider value={{ 
      decks, 
      handleAddnewDeck: addNewDeck, 
      handleAddCardToADeck: addCardToADeck, 
    }}>
      <View style={styles.container}>
        <NavigationContainer>
          <UdaciStatusBar backgroundColor={colorPrimary} barStyle="light-content" />
          <MainNavigator />
        </NavigationContainer>
      </View>
    </DecksProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
