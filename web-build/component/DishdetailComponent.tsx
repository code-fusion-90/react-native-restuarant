import React , {Component} from 'react';
import {Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder} from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {  } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state: any) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    postFavorite: (dishId: any) => dispatch(postFavorite(dishId)),
    postComment: (dishId, author, comment, rating) => dispatch(postComment(dishId, author, comment, rating))
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
                <Rating readonly imageSize={20} startingValue={props.item.rating} />
                <Text style = {{fontSize: 12}}>{'-- ' + props.item.author + ', ' + props.item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}> 
            <Card title="Comments">
                <FlatList data={comments}
                    renderItem = {renderCommentItem}
                    keyExtractor = {(item)=>item.id.toString()} />
            </Card> 
        </Animatable.View>
    );
}

function RenderDish(props: any){

    let view;

    const handleViewRef = (ref: any) => view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -100)
            return true;
        else
            return false;
    }

    //Task 3. Changed dx value for my device.
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx > -100  )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + props.dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.favPress('favorite')}},
                    ],
                    { cancelable: false }
                );
            if(recognizeComment(gestureState))
                    props.toggleModal();

            return true;
        }
    })

    if(props.dish!=null){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={handleViewRef}
            {...panResponder.panHandlers}>
                <Card featuredTitle={props.dish.name}
                    image={ {uri: baseUrl + props.dish.image }}>
                    <Text style = {{margin: 10}}>
                        {props.dish.description}
                    </Text>
                    <Icon raised reverse name={ props.favorite ? 'heart' : 'heart-o' } type='font-awesome' color="#f50" 
                            onPress = {() => props.favorite ? alert('Already favorite') : props.favPress('favorite')}/>
                    <Icon raised reverse name={'pencil'} type='font-awesome' color="#512DA8" 
                        onPress = {()=>  props.commPress('dishfeedback')}/>
                </Card>
            </Animatable.View>
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

    handleComment = (dishId) => {
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId, this.state.inputname, this.state.comment, this.state.rating);
        this.toggleFeedbackModal();
    }


  render(){
        const { dishId } = this.props.route.params;
        const dish = this.props.dishes.dishes[dishId];
        return(
            <ScrollView keyboardShouldPersistTaps='handled'>
                    <RenderDish dish={dish} favorite={this.props.favorites.some( (el: any) => el === dishId)}
                    favPress = {(e: String)=>  { this.markFavorite(dishId)}} commPress = {e => this.toggleFeedbackModal()}
                    toggleModal = {this.toggleFeedbackModal}/>
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
                            onPress = {() => { this.handleComment(dishId)}}
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