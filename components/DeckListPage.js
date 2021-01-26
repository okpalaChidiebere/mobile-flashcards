import React, { useContext } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import Deck from './Deck'
import { InfiniteListContainer } from '../utils/styles'
import Context from '../storage/DecksContext'


function DeckListPage(props) {

    const { decks = [] } = useContext(Context)
    
    const renderItem = ({ item, index }) => <TouchableOpacity>
        <Deck title={item.title} numberOfCards={item.questions.length} />
    </TouchableOpacity>

    //More on fLatlist props here https://www.pluralsight.com/guides/display-a-list-using-the-flatlist-component-in-react-native
    return (
        <InfiniteListContainer>
            <FlatList 
            data={Object.values(decks)} 
            renderItem={renderItem} 
            keyExtractor={(item, index) => `${index}`}
            />
        </InfiniteListContainer>
    )
}

export default DeckListPage

