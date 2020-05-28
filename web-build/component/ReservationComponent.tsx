import React, { Component } from 'react';
import { Text, View, ScrollView, Switch, Picker, StyleSheet, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';

class Reservation extends Component<any, any>{

    constructor(props: any){
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    handleReservation = (state: any) => {
        //Task 2. Alert Box instead of modal
        Alert.alert(
            'Your reservation OK?',
            'Number of Guests: '+state.guests+'\nSmoking? '+state.smoking+'\nDate and Time: '+state.date,
            [
                { 
                    text: 'Cancel', 
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => this.resetForm()
                }
            ],
            { cancelable: false }
        );
        //this.toggleModal();
    }

    resetForm = () => {
        this.setState({
            date: '',
            guests: 1,
            smoking: false,
            showModal: false
        });
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }
    //Task 3. Zoom in animatable added and removed the modal.
    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={500} >
                <View style={styles.formRow}> 
                    <Text style={styles.formLabel}>Number of guests</Text>
                    <Picker 
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(value, index) => this.setState({guests: value})}
                       >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Somking or Not?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor= '#512DA8'
                        onValueChange={(value)=>this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange = {(date: any) => {this.setState({date: date})}}
                        />
                </View>
                <View style = {styles.formRow}>
                    <Button
                        onPress ={()=> this.handleReservation(this.state)}
                        title = 'Reserve'
                        color = '#512DA8'
                        accessibilityLabel = 'Learn more about this purple button'
                        />
                </View>
                </Animatable.View>
            </ScrollView>
        );
    }

}


const styles = StyleSheet.create({
    formRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;