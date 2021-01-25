import React from 'react'
import { FlatList } from 'react-native'
import Deck from './Deck'
import { InfiniteListContainer } from '../utils/styles'

function DeckListPage({ decks = [] }) {

    const renderItem = ({ item, index }) => <Deck title={item.title} numberOfCards={item.numberOfCards} />

    return (
        <InfiniteListContainer>
            <FlatList 
            data={decks} 
            renderItem={renderItem} 
            keyExtractor={(item, index) => `${index}`}
            />
        </InfiniteListContainer>
    )
}

export default DeckListPage

