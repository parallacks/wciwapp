import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Linking,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchBar from '../components/SearchBar'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
const util = require('util')


class HomeScreen extends Component {
    static navigationOptions = {
//        title: 'Welcome',
        headerStyle:{
            backgroundColor: '#8a8a8a',
            elevation: 0,
        },
    };
    onPress = () => {
      //https://www.youtube.com/watch?v=9d7MjGRtsOs
      Linking.openURL('https://www.youtube.com/watch?v=9d7MjGRtsOs')
      console.log("Hello?")
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>

                  <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                      <SearchBar
                        navigation = {this.props.navigation}
                      />
                        <Collapse>
                          <CollapseHeader>
                            <View>
                              <Text>Text here</Text>
                            </View>
                          </CollapseHeader>
                          <CollapseBody>
                            <View>
                              <Text>Yay it worked</Text>
                            </View>
                          </CollapseBody>
                        </Collapse>
                      <Button
                        title = 'hello'
                        onPress = {this.onPress}
                      >
                      

                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </>
        );
    }
}



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
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

export default HomeScreen;

