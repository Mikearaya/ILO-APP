import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  Button
} from 'native-base'
import localeStore from '../locale/localization';

const radioItem = [
  { label: 'Amharic', value: 'amharic' },
  { label: 'Afan Oromo', value: 'afan_oromo' },
  { label: 'Tigrigna', value: 'tigrigna' },
  { label: 'English', value: 'english' }
]
export default class EntryScreen extends Component {
  constructor() {
    super()
    this.state = {
      radioValue: ''
    }
  }
  static navigationOptions = {
    title: localeStore.Select_language
  }

  render() {
    return (
      <Container>
        <Content>
          {radioItem.map((data, key) => {
            return (
              <ListItem
                key={key}
                onPress={() => this._signInAsync(data.value)}
              >
                <Left>
                  <Text>{data.label}</Text>
                </Left>
                <Right>
                  <Radio selected={data.value === this.state.radioValue} />
                </Right>
              </ListItem>
            )
          })}

   
        </Content>
      </Container>
    )
  }

  _signInAsync = async (data) => {
    this.setState({ radioValue: data })
  
    await AsyncStorage.setItem('userToken', data)
    this.props.navigation.navigate('Home')

    localeStore.setLocale(data)
  
  }
}
