import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { loadPartialConfig } from '@babel/core';


export default function Loading() {
    return(
        <View>
            <Text>
                Loading . . .
            </Text>
        </View>
    );
}

const style = StyleSheet.create({
    

});