import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { fetchPromos, fetchLeaders, fetchComments, fetchDishes } from '../redux/ActionCreators';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import AboutUs from './AboutComponent';
import ContactUs from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';

const mapStateToProps = (state: any) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchLeaders:() => dispatch(fetchLeaders()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())
});
  
type RootStackParamList = {
    Menu: undefined,
    Home: undefined,
    AboutUs: undefined,
    ContactUs: undefined
    DishDetail: {dishId: number},
    TableReservation: undefined,
    FavoriteDish: undefined
  };

const StackScreenOptions = {
        headerStyle: {
        backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        }
    }

const Stack = createStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();

//custom drawer used in drawer below
const CustomDrawerContentComponent = (props: any) => { return (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
            <View style = {styles.drawerHeader}>
                <View style = {{flex: 1}}>
                    <Image source={require('./images/logo.png')} style = {styles.drawerImage}/>
                </View>
                <View style = {{flex: 2}}>
                    <Text style = {styles.drawerHeaderText}>My Restaurant</Text>
                </View>
            </View>
            <DrawerItemList {...props}/>
        </SafeAreaView>
    </ScrollView> );
}

//stack navigator for menu component used in drawer
function MenuStack(props: any){
    return(
        <Stack.Navigator initialRouteName="Menu"
            screenOptions={StackScreenOptions}
          >
            <Stack.Screen name="Menu" component={Menu} 
                options={{title: 'Menu', headerLeft: () => {  return <Icon name="menu" size={24} color="white" onPress = {()=> props.navigation.toggleDrawer()}/> } }} />
            <Stack.Screen name="DishDetail" component={DishDetail} options={{ title: 'Dish Details' }} />
        </Stack.Navigator>
    );
}

//Stack navigator for Home Component
function HomeStack(props: any){
    return(
        <Stack.Navigator screenOptions={StackScreenOptions} >
            <Stack.Screen name="Home" component={Home} 
                options={{ title: 'Home', headerLeft: () => {  return <Icon name="menu" size={24} color="white" onPress = {()=> props.navigation.toggleDrawer()}/> } }} />
        </Stack.Navigator>
    );
}

//Stack navigator for About Component
function AboutUsStack(props: any){
    return(
        <Stack.Navigator screenOptions={StackScreenOptions} >
            <Stack.Screen name="AboutUs" component={AboutUs} 
                options={{ title: 'About Us', headerLeft: () => {  return <Icon name="menu" size={24} color="white" onPress = {()=> props.navigation.toggleDrawer()}/> } }} />
        </Stack.Navigator>
    );
}

//Stack Navigator for contact component
function ContactUsStack(props: any){
    return(
        <Stack.Navigator screenOptions={StackScreenOptions} >
            <Stack.Screen name="AboutUs" component={ContactUs} 
                options={{ title: 'About Us', headerLeft: () => {  return <Icon name="menu" size={24} color="white" onPress = {()=> props.navigation.toggleDrawer()}/> } }} />
        </Stack.Navigator>
    );
}


//Reservation table
function ReserveTable(props: any){
        return(
            <Stack.Navigator screenOptions={StackScreenOptions} >
                <Stack.Screen name="TableReservation" component={Reservation}
                    options={{ title: 'Reserve a table' ,  headerLeft: () => {  return <Icon name="menu" size={24} color="white" onPress = {()=> props.navigation.toggleDrawer()}/> } }} />
            </Stack.Navigator>
        );
}

//Favorite Dish Companent
function FavoriteDishStack(props: any){
    return(
        <Stack.Navigator screenOptions={StackScreenOptions} >
            <Stack.Screen name="FavoriteDish" component={Favorites}
                options={{ title: 'Favorite Dishes' ,  headerLeft: () => {  return <Icon name="menu" size={24} color="white" onPress = {()=> props.navigation.toggleDrawer()}/> } }} />
        </Stack.Navigator>
    );
}


class Main extends React.Component<any> {

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchLeaders();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render(){
        return(
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContentComponent {...props} />} drawerStyle={{backgroundColor: '#D1C4E9', width: 240}}>
                    <Drawer.Screen name="Home" component={HomeStack} 
                        options= {{ title: 'Home', 
                                    drawerLabel: "Home", 
                                    drawerIcon: (tintColor) => (
                                    <Icon name="home" type="font-awesome" size={24}
                                    color={tintColor.color} />
                                )}}
                    />
                    <Drawer.Screen name="AboutUs" component={AboutUsStack} 
                        options= {{ title: 'About', 
                                    drawerLabel: "About", 
                                    drawerIcon: (tintColor) => (
                                    <Icon name="info-circle" type="font-awesome" size={24}
                                    color={tintColor.color} />
                                )}}
                    />   
                    <Drawer.Screen name="Menu" component={MenuStack} 
                        options= {{ title: 'Menu', 
                                    drawerLabel: 'Menu',
                                    drawerIcon: (tintColor) => (
                                   <Icon name="list" type="font-awesome" size={24}
                                    color={tintColor.color} />
                                )}}
                    />  
                    <Drawer.Screen name="FavoriteDishes" component={FavoriteDishStack} 
                        options= {{ title: 'Favorite Dishes', 
                                    drawerLabel: 'Favorite Dishes',
                                    drawerIcon: (tintColor) => (
                                   <Icon name="heart" type="font-awesome" size={24}
                                    color={tintColor.color} />
                                )}}
                    />     
                    <Drawer.Screen name="ContactUs" component={ContactUsStack} 
                            options= {{ title: 'Contact', 
                                        drawerLabel: "Contact Us", 
                                        drawerIcon: (tintColor) => (
                                        <Icon name="address-card" type="font-awesome" size={22}
                                        color={tintColor.color} />
                                    )}}
                    />
                    <Drawer.Screen name="ReservationTable" component={ReserveTable} 
                        options= {{ title: 'Reserve Table', 
                                    drawerLabel: "Reserve Table", 
                                    drawerIcon: (tintColor) => (
                                    <Icon name="info-circle" type="font-awesome" size={24}
                                    color={tintColor.color} />
                                )}}
                    />
            </Drawer.Navigator>
         </NavigationContainer>
        );
               
    }
}

const styles = StyleSheet.create({

    container: {flex: 1},
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
      },
      drawerHeaderText: {
        color: 'white',
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold'
      },
      drawerImage: {
        margin: 10,
        width: 80,
        height: 60
      }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);