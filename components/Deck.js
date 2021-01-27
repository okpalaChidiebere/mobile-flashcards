import React from 'react'
import { DeckItem, TextPrimary, TextSecondary } from '../utils/styles'

function Deck ({ title, numberOfCards }){

    return(
        <DeckItem>
            <TextPrimary fontSize={`${30}px`}>{title}</TextPrimary>
            <TextSecondary>{`${numberOfCards} Cards`}</TextSecondary>
        </DeckItem>
    )
}

export default Deck