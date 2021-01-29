import React, { useContext } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import Deck from './Deck'
import { InfiniteListContainer } from '../utils/styles'
import Context from '../storage/DecksContext'
import { DECK_DETAILS_STACK } from '../utils/constants'
import { CommonActions } from '@react-navigation/native';


function DeckListPage(props) {

    const { decks = [] } = useContext(Context)
    
    const renderItem = ({ item, index }) => (
        <TouchableOpacity 
        onPress={() => props.navigation.dispatch(
            CommonActions.navigate({
              name: DECK_DETAILS_STACK,
              params: {
                title: item.title,
              },
            })
        )}>
            <Deck title={item.title} numberOfCards={item.questions.length} />
        </TouchableOpacity>)

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

/*const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
    }
})


<View>
            {decks.length > 0 
            ?(<InfiniteListContainer>
            <FlatList 
            data={Object.values(decks)} 
            renderItem={renderItem} 
            keyExtractor={(item, index) => `${index}`}
            />
            </InfiniteListContainer>)
            : (
                <View style={styles.center}>
                    <Text>Your Deck is Empty</Text>
                </View>
            )}
        </View>
*/
