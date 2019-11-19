import React, {Component} from 'react';
import {Text, View, Button, FlatList} from 'react-native'
import SearchBar from '../components/SearchBar'
import ListItem from '../components/ListItem'
const util = require('util')


class SecondScreen extends Component {

    constructor(props){
        super(props);
        // this.state = {searchTerm: 'Value'};
        this.navigation  = this.props.navigation;
        this.items = this.props.navigation.state.params.items;
        // this.items=[]
        // console.log(this.props.navigation.state.params.items);
    }
    

    static navigationOptions = {
        // ${this.props.navigation.state.params.searchTerm}
        title: `Where can I watch `
    };

    render() {
        return (
            <View>
                <FlatList
                    data = {this.items}
                    renderItem = {({item}) => <ListItem item = {item}/>}
                    keyExtractor= {item => item.toString()}
                />
            </View>
        );
    }
}

export default SecondScreen;