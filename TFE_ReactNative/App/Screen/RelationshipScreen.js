import i18n from "i18n-js";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import RelationshipList from "../Components/RelationshipList";
import Colors from "../constants/Colors";
import { NavigationEvents } from "react-navigation";

export default class RelationshipScreen extends React.Component {
  static navigationOptions = () => ({
    title: i18n.t("General.Relationship"),
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: "#FFFFFF"
  });
  constructor(props) {
    super(props);
  }

  _detailPage = id => {
    this.props.navigation.navigate("RelationshipDetail", { id: id });
  };

  render() {
    const screenProps = {
      goDetailPage: this._detailPage
    };
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NavigationEvents />
        <Text>{i18n.t("Relationship.MyRelationships")}</Text>
        <Button
          title={i18n.t("Relationship.AddNewRelationship")}
          onPress={() => this.props.navigation.navigate("NewRelationshipType")}
        />
        <RelationshipList screenProps={screenProps} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
