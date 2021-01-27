/*
- Tab Navigator allows us to route between Tabs
- Stack Navigator allows us to drill deeper into our route hierarchy 
  and also have little right to left transition as it loads the component pages
- Drawer Navigator allows us to have a drawer to to navigate between Component
 pages. Basicually you slide the screen to the right to see the navigation for the app
*/

/*Application Tabs */
export const DECK_LIST_TAB = 'DeckListPage' //Route to DeckListPage Component
export const ADD_DECK_TAB = 'AddDeckPage' //Route to AddDeckPage Component

/* Application Stacks */
export const HOME_STACK = 'Home' //Route to App COmponent that renders a Tab Naigation that routes to DeckListPage and AddDeckPage
export const DECK_DETAILS_STACK = 'DeckDetails' //Route to DeckDetails Component Page
export const ADD_CARD_STACK = 'AddCard' //Route to AddCard Component
