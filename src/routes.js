import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import ListContact from './pages/listContact'
import EditContact from './pages/editContact'
import NewContact from './pages/newContact'

const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="ListContact" component={ListContact} />
            <Stack.Screen name="EditContact" component={EditContact} />
            <Stack.Screen name="NewContact" component={NewContact} />

        </Stack.Navigator>
    )
}