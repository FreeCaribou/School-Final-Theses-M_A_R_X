import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import {
  getMyRelationshipType,
  getMyRelationship
} from "../services/RelationshipService";
import Loader from "./Loader";
import { NavigationEvents } from "react-navigation";

export default class RelationshipList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: []
    };
  }

  _keyExtractor = (item, index) => item.id + "";

  _getRelationshipType() {
    this.setState({ isLoading: true });
    getMyRelationship()
      .then(responseJson => {
        this.setState({
          isLoading: false,
          list: responseJson
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        console.error(error);
      });
  }

  _selectItem(item) {
    this.props.screenProps.goDetailPage(item.id);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <NavigationEvents onDidFocus={this._getRelationshipType.bind(this)} />
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading && (
          <FlatList
            data={this.state.list}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <Text
                style={styles.listItem}
                onPress={this._selectItem.bind(this, item)}
              >
                {item.name}
              </Text>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  listItem: {
    marginBottom: 10
  }
});
