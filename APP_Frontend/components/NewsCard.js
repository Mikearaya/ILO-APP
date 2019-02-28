import React, { Component } from 'react';
import { Card, CardItem, Left, Body, Text,  } from 'native-base';
import {StyleSheet, Image} from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    newsImage: {
        height: 200,
        width: 320
    }
});

export default class NewsCard extends Component { 

    render() {
        return (
            <Card style={style.container}>
                <CardItem bordered>
                    <Left>
                        <Body>
                            <Text>{this.props.newsItems.title}</Text>
                            <Text note>{this.props.newsItems.postDate}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem button onPress={() => this.props.navigation.navigate('NewsDetail')}>
                    <Body>
                        <Image  resizeMode="stretch" source={require('./../assets/images/notfound.png')} style={style.newsImage}/>
                        <Text>
                            {
                                this.props.newsItems.data
                            }
                        </Text>
                    </Body>
                </CardItem>
            </Card>
 
        )
    }
}
