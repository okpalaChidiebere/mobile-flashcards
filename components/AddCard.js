import React  from 'react'
import {Text, View} from 'react-native'
import { colorPrimary, icons } from '../utils/colors'

function AddCard (props) {
    
    return (
        <View>
            <Text>Deck Detail - {JSON.stringify(props.route.params.title)}</Text>
        </View>
    )
    
}

export default AddCard

export function AddCardNavigationOptions({ route }) { //we haveaccess to the route props. we can get any parameter we want like ids from this props

    return{
        //Styling the header for this Component
        headerTintColor: icons,
        headerStyle: {
            backgroundColor: colorPrimary,
        },
        //End Etyling header for this Component
        title: "Add Card", 
    }
}