import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
export default class SearchBar extends Component{
    //    const value = '';
        constructor(props){
            super(props);
            this.state = {
              searchTerm: '',
              ipaddress:'10.217.78.105'
            };
        }
    
        render() {
            return (
    //            console.log(this.props);
                <View>
                  <View>
                    <TextInput
                      style = {styles.searchBar}
                      placeholder = 'Enter IP address of server'
                      onChangeText={(ipaddress) => this.setState({ipaddress})}
                      value = {this.state.ipaddress}
                      />
                  </View>
                    <Text style = {styles.sectionTitle}>Where can I watch</Text>
                      <TextInput
                        style = {styles.searchBar}
                        placeholder = 'Enter movie title here'
                        onChangeText={(searchTerm) => this.setState({searchTerm})}
                        value = {this.state.searchTerm}
                        />
                    <Button
                        title = "Search"
                        onPress={() => {
                          // /search/movie/${this.state.searchTerm}`)
                                    fetch(`http://${this.state.ipaddress}:3000/api/search/movie/${this.state.searchTerm}`)
                                    .then((response) => response.json())
                                    .then((response) =>{
                                      // console.log(response);
                                      this.props.navigation.navigate(
                                        {
                                          routeName: 'Results',
                                          key: 'Results',
                                          params: {
                                            items: response,
                                            searchTerm: this.state.searchTerm
                                          }
                                        }
                                      );
                                    })
                                  }}
                     />
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
        body: {
          backgroundColor: '#8a8a8a',
          alignItems:'center'
        },
        sectionContainer: {
          marginTop: 32,
          paddingHorizontal: 24,
        },
        sectionTitle: {
          fontSize: 24,
          fontWeight: '600',
          color: Colors.black,
        },
        sectionDescription: {
          marginTop: 8,
          fontSize: 18,
          fontWeight: '400',
          color: Colors.dark,
        },
        highlight: {
          fontWeight: '700',
        },
        footer: {
          color: Colors.dark,
          fontSize: 12,
          fontWeight: '600',
          padding: 4,
          paddingRight: 12,
          textAlign: 'right',
        },
        searchBar: {
          color: '#fff',
          borderBottomColor: '#000',
          backgroundColor: '#949494',
          fontSize: 24,
          borderBottomWidth: 7,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          borderBottomStartRadius: 5,
      
      
        },
      });