import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Platform } from 'react-native'
import { DECK_LIST_TAB, ADD_DECK_TAB } from '../utils/constants'
import { icons, colorPrimary, colorAccent } from '../utils/colors'

const Tabs =
  Platform.OS === 'ios'
    ? createBottomTabNavigator() //we show the tab at the bottom for android
    : createMaterialTopTabNavigator() //we show normal tab for androdi at the top of the screen

export const TabNav = () => (
  <Tabs.Navigator
      initialRouteName={DECK_LIST_TAB}
      tabBarOptions={{
          header: null,
          activeTintColor: Platform.OS === "ios" ? colorPrimary : icons,
          showIcon: false,
          style: {
              height: 80,
              backgroundColor: Platform.OS === "ios" ? icons : colorPrimary,
              shadowColor: colorAccent,
              shadowOffset: {
                  width: 0,
                  height: 3
              },
              shadowRadius: 6,
              shadowOpacity: 1
          }
      }}
  >
    <Tabs.Screen name={DECK_LIST_TAB} component={History}/>
    <Tabs.Screen name={ADD_DECK_TAB} component={AddEntry} />
  </Tabs.Navigator>
)