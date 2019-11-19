import React, {Component} from 'react'
import {Text, View, TouchableHighlight, StyleSheet,Image,Linking, FlatList, SectionList} from 'react-native'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
// import { FlatList } from 'react-native-gesture-handler';

const images = {
    netflix: require('../icons/netflix_icon.png'),
    hulu_plus: require('../icons/hulu_icon.png'),
    prime: require('../icons/prime_icon.png'),
    vudu: require('../icons/vudu_icon.png'),
    google_play: require('../icons/google_play_icon.png'),
    disney_plus: require('../icons/disney_plus_icon.png')
}


class ListItem extends Component {

    constructor(props){
        super(props);
        this.item = this.props.item;
        // console.log("Trying to build a List Item")
    }

    findSource (movie, source_name) {
        for (let id in movie.free_android_sources){
            if (movie.free_android_sources[id].source === source_name){
                let removed =  movie.free_android_sources[id]
                movie.free_android_sources.splice(id,1)
                return removed
            }
        }
        for (let id in movie.purchase_android_sources){
            if (movie.purchase_android_sources[id].source ==source_name){
                let removed = movie.purchase_android_sources[id]
                movie.purchase_android_sources.splice(id,1)
                return removed
            }
        }
        for (let id in movie.subscription_android_sources){
            if (movie.subscription_android_sources[id].source == source_name){
                let removed = movie.subscription_android_sources[id]
                movie.subscription_android_sources.splice(id,1)
                return removed
            }
        }
        return
    }

    render() {
        let netflix
        let hulu
        let prime 
        let source = this.findSource(this.item, 'netflix')
        if (source){
            netflix = <IconItem source = {source}/>
        }else{
            netflix = <DisabledIcon source = 'netflix'/>
        }
        source = this.findSource(this.item, 'hulu_plus')
        if (source){
            hulu = <IconItem source = {source}/>
        }else{
            hulu = <DisabledIcon source = 'hulu_plus'/>
        }
        source = this.findSource(this.item, 'prime')
        if (source){
            prime = <IconItem source = {source}/>
        }else{
            prime = <DisabledIcon source = 'prime'/>
        }
        return (
            <View style = {styles.outer_view}>
                <View style = {styles.main_view}>
                    <Image
                        style = {styles.movie_image}
                        source={{uri: this.item.poster_small}}
                    />
                    <View style = {styles.inner_view}>
                        <Text style = {styles.title_text}>{this.item.title}</Text>
                        <Text>Availible on:</Text>
                        <View style = {styles.main_view}>
                            {netflix}
                            {hulu}
                            {prime}                            
                        </View>
                    </View>
                </View>
                <CollapsibleView
                    style = {styles.collapse}
                    movie = {this.item}
                >
                
                </CollapsibleView>
            </View>
        )
    }
    
}

class CollapsibleView extends Component{
    constructor(props){
        super(props);
        this.movie = this.props.movie;
    }

    getListofServices =(item)=>{
        console.log(`Item ${item}`);
        let free_source = []
        let sub_source = []
        let paid_source = []

        for (let id in item.free_android_sources){
            let source = item.free_android_sources[id]
            let add_source = {
                source: source.source,
                link: source.link,
                app_name: source.app_name,
                app_link: source.app_link,
                app_required: source.app_required,
                app_download_link: source.app_download_link
            }
            free_source.push(add_source);
        }
        for (let id in item.purchase_android_sources){
            let source = item.purchase_android_sources[id]
            let add_source = {
                source: source.source,
                link: source.link,
                app_name: source.app_name,
                app_link: source.app_link,
                app_required: source.app_required,
                app_download_link: source.app_download_link
            }
            paid_source.push(add_source);
        }
        for (let id in item.subscription_android_sources){
            let source = item.subscription_android_sources[id]
            let add_source = {
                source: source.source,
                link: source.link,
                app_name: source.app_name,
                app_link: source.app_link,
                app_required: source.app_required,
                app_download_link: source.app_download_link
            }
            sub_source.push(add_source);
        }
        return [
            {
                title: 'Free Sources',
                data: free_source
            },
            {
                title: 'Subscription Sources',
                data: sub_source
            },
            {
                title: 'Purchase Sources',
                data: paid_source
            }
        ]
    }

    render () {
        let all_sources = this.getListofServices(this.movie)
        // console.log(all_sources.paid_sources)
        return (
            <Collapse>
                <CollapseHeader>
                    <View style = {styles.drop_button_view}>
                        <Image
                            style = {styles.drop_button}
                            source = {require('../icons/down_icon.png')}
                        />
                    </View>
                </CollapseHeader>
                <CollapseBody>
                <SectionList
                    // style = {styles.horizontal_list}
                    sections={all_sources}
                    keyExtractor={(item, index) => item + index + Math.random()}
                    renderItem={({ item }) => <IconItem source={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.horizontal_list}>{title}</Text>
                    )}
                />
                    {/* <View>
                        {/* <Text>Free Options</Text>
                            <View>
                                <FlatList
                                    style = {styles.horizontal_list}
                                    data = {all_sources.free_sources}
                                    renderItem = {({item}) => <IconItem source = {item}/>}
                                    keyExtractor= {item => item.toString()}
                                />
                            </View> }
                        <Text>Subscription Options</Text>
                            <View>
                                <FlatList
                                    style = {styles.horizontal_list}
                                    data = {all_sources.sub_sources}
                                    renderItem = {({item}) => <IconItem source = {item}/>}
                                    keyExtractor= {item => item.toString()}
                                />
                            </View>
                        <Text>Purchase Options</Text>
                        <View>
                                <FlatList
                                    style = {styles.horizontal_list}
                                    data = {all_sources.paid_sources}
                                    renderItem = {({item}) => <IconItem source = {item}/>}
                                    keyExtractor= {item => item.toString()}
                                />
                            </View>
                    </View> */}
                </CollapseBody>
            </Collapse>
        )
    }

}


class IconItem extends Component {
    constructor(props) {
        super(props);
        this.source = this.props.source;

    }

    onPress = () => {
        Linking.canOpenURL(this.source.link)
        .then((supported) => {
            if (!supported) {
                if(this.source.app_required){
                    Linking.openURL(this.source.app_download_link)
                }else{
                    Linking.openURL(this.source.link)
                }
            // console.log("Can't handle url: " + url);
            } else {
                return Linking.openURL(this.source.link);
            }
        })
        .catch((err) => console.error('An error occurred', err));
    }
    render(){
        console.log("rendering a iconitem")
        console.log(this.source)
        return (
            <TouchableHighlight
                onPress={this.onPress}
            >
                <Image
                    style = {styles.icon}
                    source = {images[this.source.source]}
                />
            </TouchableHighlight>
        )
    }
}
class DisabledIcon extends Component {
    constructor(props){
        super(props);
        this.source = this.props.source
    }
    render(){
        return(
            <View>
                <Image
                    style = {styles.disabled_icon}
                    source = {images[this.source]}
                />
                <Image source={images[this.source]} style={styles.back_icon} />
        </View>
        )
    }
}


var styles = StyleSheet.create({
    movie_image: {
        height: 171,
        width: 120,
        // padding: 10,
        // marginLeft: 20,
        // marginRight: 10,
        // marginTop: 10,
        // marginBottom: 10
    },
    main_view: {
        flexDirection: 'row',
        backgroundColor: '#9a9a9a',
        padding: 20
    },
    inner_view: {
        margin: 10
    },
    title_text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    icon:{
        height: 60,
        width: 60,
    },
    disabled_icon:{
        height: 60,
        width: 60,
        tintColor: 'gray'
    },
    back_icon: {
        height: 60,
        width: 60,
        position: 'absolute',
        opacity: 0.3
    },
    drop_button: {
        width: 30,
        height: 30,
        marginRight: 10,
        marginBottom: 10
    },
    drop_button_view: {
        alignItems: 'flex-end'
    },
    outer_view: {
        backgroundColor: '#9a9a9a',
    },
    horizontal_list: {
        flexDirection: 'row'
    }

})

export default ListItem;