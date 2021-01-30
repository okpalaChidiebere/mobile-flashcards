import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

const DECKS_NOTIFICATION_CHANNEL_ID = "decks_notification_channel"
const NOTIFICATION_KEY = 'mobile-flashcards:notifications'

//If you dont set handler the notification will not show
//You can customize this here 
//https://docs.expo.io/versions/v40.0.0/sdk/notifications/#setnotificationhandlerhandler-notificationhandler--null-void
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
});

export const clearLocalNotification = async () => {
    await AsyncStorage.removeItem(NOTIFICATION_KEY)
    Notifications.cancelAllScheduledNotificationsAsync()
}

function createNotification (trigger) {
    return{
        channelId: DECKS_NOTIFICATION_CHANNEL_ID,
        content: {
          title: "Complete a Quizz!",
          body: "👋 Don't forget to complete a quizz for today!",
          sound: "email-sound.wav", // <- for Android below 8.0
          priority: "high",
          enableVibrate: true,
        },
        trigger,
    }
}

export const setLocalNotification = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(NOTIFICATION_KEY)
        const key = jsonValue != null && JSON.parse(jsonValue)
        if(key != null){

            //let token;
            if (Constants.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync()
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync()
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!')
                    return;
                }
                //token = (await Notifications.getExpoPushTokenAsync()).data
                //console.log(token) //will be need if i want to push a notification from our custom server

                await Notifications.cancelScheduledNotificationAsync(DECKS_NOTIFICATION_CHANNEL_ID)
                //await Notifications.cancelAllScheduledNotificationsAsync()

                const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
                    channelId: DECKS_NOTIFICATION_CHANNEL_ID,
                    hour: 20,
                    minute: 0,
                    repeats: true,
                    //seconds: 2,
                })

                Notifications.scheduleNotificationAsync(createNotification(nextTriggerDate))

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

            } else {
                alert('Must use physical device for Push Notifications');
            }
        }
    } catch(e) {
        console.warn("notifications", e)
    }
}