import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';


//ADD NEW COMMENT
export const postComment = (dishId, author, comment, rating) => (dispatch) => {
    console.log('post comment called');
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    return setTimeout(() => {
        dispatch(addComment(newComment));
    }, 2000)
}

const addComment = (newComment) => ({
type: ActionTypes.ADD_COMMENT,
payload: newComment
})


//ADD FAVORITE
export const postFavorite = (dishId) => (dispatch) => {
        return setTimeout(() => {
            dispatch(addFavorite(dishId));
        }, 2000)
}

const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
})

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
});  


//COMMENTS
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok)
                return response;
            else{
                let err = new Error('Error '+response.status + ': ' + response.statusText);
                err.response = response;
                throw err;
            }
        }, error => {
            let err = new Error(error.message);
            throw err;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.maessage)))
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (err) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: err
});

//DISHES
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok)
                return response;
            else{
                let err = new Error('Error '+response.status + ': ' + response.statusText);
                err.response = response;
                throw err;
            }
        }, error => {
            let err = new Error(error.message);
            throw err;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
    payload: null
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const dishesFailed = (error) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: error
});


//PROMOS
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok)
                return response;
            else{
                let err = new Error('Error '+response.status + ': ' + response.statusText);
                err.response = response;
                throw err;
            }
        }, error => {
            let err = new Error(error.message);
            throw err;
        })
        .then(response => response.json())
        .then(promotions => dispatch(addPromos(promotions)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
    payload: null
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const promosFailed = (error) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: error
});


//LEADERS
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok)
                return response;
            else{
                let err = new Error('Error '+response.status + ': ' + response.statusText);
                err.response = response;
                throw err;
            }
        }, error => {
            let err = new Error(error.message);
            throw err;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
    payload: null
});

const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

const leadersFailed = (error) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: error
});
