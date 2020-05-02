import React , {Component} from 'react';
import {Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {  } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = (state: any) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    postFavorite: (dishId: any) => dispatch(postFavorite(dishId))
});

type RootStackParamList = {
    Menu: undefined,
    DishDetail: {dishId: number},
  };

  type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'DishDetail'>;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'DishDetail'>;

interface Props {
    navigation: ProfileScreenNavigationProp,
    route: ProfileScreenRouteProp,
}

interface State {
    favorites: number[]
}

function RenderComments({comments}: any){

    const renderCommentItem = (props: {item: any, index: number}) => {
        return(
            <View key={props.index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{props.item.comment}</Text>
                <Text style = {{fontSize: 12}}>{props.item.rating}</Text>
                <Text style = {{fontSize: 12}}>{'-- ' + props.item.author + ', ' + props.item.date}</Text>
            </View>
        );
    }

    return(
        <Card title="Comments">
            <FlatList data={comments}
                renderItem = {renderCommentItem}
                keyExtractor = {(item)=>item.id.toString()} />
        </Card> 
    );
}

function RenderDish(props: any){
    if(props.dish!=null){
        return(
                <Card featuredTitle={props.dish.name}
                    image={ {uri: baseUrl + props.dish.image }}>
                    <Text style = {{margin: 10}}>
                        {props.dish.description}
                    </Text>
                    <Icon raised reverse name={ props.favorite ? 'heart' : 'heart-o' } type='font-awesome' color="#f50" 
                            onPress = {() => props.favorite ? alert('Already favorite') : props.onPress('favorite')}/>
                    <Icon raised reverse name={'pencil'} type='font-awesome' color="#512DA8" 
                        onPress = {()=>  props.onPress('dishfeedback')}/>
                </Card>
            );
    }else{
        return(
            <View></View>
        );
    }
}



class DishDetail extends Component<any, any>{

    constructor(props: any){
        super(props);
        this.state = {
            showModal: false,
            inputname: '',
            comment: '',
            rating: 0
        }
    }

    markFavorite = (dishId: number) => {
       this.props.postFavorite(dishId);
    }

   toggleFeedbackModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    handleComment = () => {
        console.log(JSON.stringify(this.state));
    }


  render(){
        const { dishId } = this.props.route.params;
        const dish = this.props.dishes.dishes[dishId];
        return(
            <ScrollView keyboardShouldPersistTaps='handled'>
                    <RenderDish dish={dish} favorite={this.props.favorites.some( (el: any) => el === dishId)}
                    onPress = {(e: String)=>  { console.log(e); e==='favorite' ? this.markFavorite(dishId) : this.toggleFeedbackModal()}}/>
                    <RenderComments comments={this.props.comments.comments.filter((comment: any) => comment.dishId === dishId)}/>
                    <Modal
                     animationType='slide'
                     transparent={false}
                     visible={this.state.showModal}
                     onDismiss={() => {this.toggleFeedbackModal()}}
                     onRequestClose={() => {this.toggleFeedbackModal()}}
                    >
                        <View style={styles.modal}>
                            <Rating showRating fractions={1} startingValue={3.3}  
                            onFinishRating = {(value)=> this.setState({rating: value})}/>
                            <Input placeholder='  Author' style={{margin: 10}} leftIcon={{ type: 'font-awesome', name: 'user'}} 
                            onChangeText = {(value) => this.setState({inputname: value})}/>
                            <Input placeholder='  Comment' leftIcon={{ type: 'font-awesome', name: 'comment' }} 
                            onChangeText = {(value)=> this.setState({comment: value})} />
                        </View>
                        <View style ={{margin: 20}}>
                        <Button 
                            onPress = {() => { this.handleComment()}}
                            color="#512DA8"
                            title="Submit" 
                            />
                        </View >
                        <View style ={{margin: 20}}>
                        <Button 
                            onPress = {() =>{this.toggleFeedbackModal()}}
                            color="grey"
                            title="Close" 
                            />
                        </View>
                </Modal>
            </ScrollView>
        );
  }
}


const styles = StyleSheet.create({
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);