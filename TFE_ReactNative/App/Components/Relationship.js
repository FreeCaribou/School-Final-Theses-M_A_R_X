import i18n from "i18n-js";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default class RelationshipDetailScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.relationship.name}</Text>
        <Text>
          {this.props.relationship.userRelationshipType.relationshipType.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#000000',
    marginBottom: 5
  }
});
