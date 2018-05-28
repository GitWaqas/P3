import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo'

import DataStore from '../facade/DataStore';

var datastore = new DataStore();

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', password: '', friends: [],
            region: { latitude: 55.7704186, longitude: 12.5117948, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
            locationResult: null,
            location: { coords: { latitude: 55.7704186, longitude: 12.5117948 } },
        };
        this.store = datastore;
        this.submit = this.submit.bind(this);
    }

    
    componentDidMount() {
        this._getLocationAsync();
    }

    onRegionChange = region => {
        this.setState({ region });
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location), location, });
    };
    async submit() {
        try {
            const username = this.state.username;
            const password = this.state.password;

            await this.store.login(username, password, (data) => {
                this.setState({ friends: data });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.friends != this.state.friends) {
            this.getFriendsCoordinates = this.getFriendsCoordinates.bind(this);
        }
    }
    getFriendsCoordinates() {
        return this.state.friends.map(function (friend, f) {
            return (
                <MapView.Marker
                    key={f}
                   
                />
            )
        })
    }
    render() {
        return (
            <View>
                <Text>Username</Text>
                <TextInput 
                placeholder="enter username"
                style={{ height: 40, padding: 2, borderColor: 'gray', borderWidth: 1 }} 
                onChangeText={(username) => this.setState({ username: username })}
                value={this.state.username}
                />

                <Text>Password</Text>
                <TextInput 
                placeholder="enter password"
                secureTextEntry={true} 
                style={{ height: 40, padding: 2, borderColor: 'gray', borderWidth: 1  }} 
                onChangeText={(password) => this.setState({ password: password })}
                value={this.state.password}
                />

                <Button onPress={this.submit} title='Login' />
                
                <MapView style={{flex: 1}} initialRegion={this.state.region} 
                onRegionChange={this.onRegionChange}>
                {this.getFriendsCoordinates()}
                </MapView>

            </View>
        );
    }
}