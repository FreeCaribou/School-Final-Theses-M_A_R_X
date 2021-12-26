import i18n from "i18n-js";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Picker
} from "react-native";
import Colors from "../constants/Colors";
import {
  getMyRelationshipType,
  postRelationship
} from "../services/RelationshipService";
import { NavigationEvents } from "react-navigation";
import Loader from "../Components/Loader";

export default class NewRelationshipScreen extends React.Component {
  static navigationOptions = () => ({
    title: i18n.t("General.Relationship"),
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: "#FFFFFF"
  });
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      relationshipTypeList: [],
      relationshipTypeId: 0,
      isLoading: false
    };
  }

  _firstCall() {
    this._getRelationshipType();
  }

  _onPressButtonAdd() {
    this._postRelationship();
  }

  _postRelationship() {
    this.setState({ isLoading: true });
    postRelationship(this.state.name, this.state.relationshipTypeId)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ isLoading: false });
        this.props.navigation.navigate("Relationship");
      })
      .catch(error => {
        console.error(error);
      });
  }

  _getRelationshipType() {
    this.setState({ isLoading: true });
    getMyRelationshipType()
      .then(responseJson => {
        console.log(responseJson);
        let relationshipTypeList = responseJson;
        this.setState({
          relationshipTypeList,
          relationshipTypeId: relationshipTypeList[0].id,
          modalVisible: false,
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _loadDropdownRelationshipType() {
    return this.state.relationshipTypeList.map(item => (
      <Picker.Item
        key={item.id}
        label={item.relationshipType.name}
        value={item.id}
      />
    ));
  }

  render() {
    let view;
    if (!this.state.relationshipTypeList.length > 0) {
      view = <Loader />;
    } else {
      view = (
        <View>
          <View>
            <Text>{i18n.t("Relationship.AddNewRelationship")}</Text>
          </View>

          <View>
            <TextInput
              placeholder="Name"
              onChangeText={name => this.setState({ name })}
            />
            <Picker
              selectedValue={this.state.relationshipTypeId}
              style={{ height: 50, width: 250 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ relationshipTypeId: itemValue })
              }
            >
              {this._loadDropdownRelationshipType()}
            </Picker>
          </View>
          <View>
            <Button
              title="Add"
              onPress={this._postRelationship.bind(this)}
              disabled={this.state.name == ""}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.containerView}>
        <NavigationEvents onDidFocus={this._firstCall.bind(this)} />
        {view}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
});
