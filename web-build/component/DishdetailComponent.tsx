import React , {Component} from 'react';
import {Text, View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
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
                            onPress = {() => props.favorite ? alert('Already favorite') : props.onPress()}/>
                </Card>
            );
    }else{
        return(
            <View></View>
        );
    }
}


class DishDetail extends Component<any>{

    constructor(props: any){
        super(props);
    }

    markFavorite = (dishId: number) => {
       this.props.postFavorite(dishId);
    }

  render(){
        const { dishId } = this.props.route.params;
        const dish = this.props.dishes.dishes[dishId];
        return(
            <ScrollView>
                    <RenderDish dish={dish} favorite={this.props.favorites.some( (el: any) => el === dishId)}
                    onPress = {()=> this.markFavorite(dishId)}/>
                    <RenderComments comments={this.props.comments.comments.filter((comment: any) => comment.dishId === dishId)} />
            </ScrollView>
        );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);