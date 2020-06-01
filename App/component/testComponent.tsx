import React from 'react';
import { View, Text } from 'react-native'; 


export default function Test(props: string){

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
      </View>
    );

}