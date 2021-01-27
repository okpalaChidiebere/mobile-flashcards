import React  from 'react'
import {Text, View} from 'react-native'
import { colorPrimary, icons } from '../utils/colors'

function DeckDetails (props) {
    
    return (
        <View>
            <Text>Deck Detail - {JSON.stringify(props.route.params.deck)}</Text>
        </View>
    )
    
}

export default DeckDetails

export function DeckDetailsNavigationOptions({ route }) { //we haveaccess to the route props. we can get any parameter we want like ids from this props

    const { deck } = route.params

    return{
        //Styling the header for this Component
        headerTintColor: icons,
        headerStyle: {
            backgroundColor: colorPrimary,
        },
        //End Etyling header for this Component
        title: deck.title, 
    }
}