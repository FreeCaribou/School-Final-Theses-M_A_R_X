import React from "react";
import { View } from "react-native";
import { getRelationshipDetail } from "../services/RelationshipService";
import { NavigationEvents } from "react-navigation";
import Loader from "../Components/Loader";
import Relationship from "../Components/Relationship";

export default class RelationshipDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      relationship: "",
      isLoading: true
    };
  }

  async _firstCall() {
    let itemId = this.props.navigation.getParam("id", 0);
    await this.setState({
      id: itemId
    });
    this._getRelationshipDetail();
  }

  _getRelationshipDetail() {
    this.setState({ isLoading: true });
    getRelationshipDetail(this.state.id)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          relationship: responseJson
        });
        console.log(this.state.relationship.name);
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        console.error(error);
      });
  }

  render() {
    let view;
    if (this.state.isLoading) {
      view = <Loader />;
    } else {
      view = (
        <View style={{ flex: 1, flexDirection: "column" }}>
          {/* Part égal */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Relationship relationship={this.state.relationship} />
            </View>
            <View style={{ flex: 1 }}>
              <Relationship relationship={this.state.relationship} />
            </View>
          </View>
          {/* Aucune précision */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Relationship relationship={this.state.relationship} />
            <Relationship relationship={this.state.relationship} />
          </View>
          {/* L'un plus grand */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 2 }}>
              <Relationship relationship={this.state.relationship} />
            </View>
            <View style={{ flex: 1 }}>
              <Relationship relationship={this.state.relationship} />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, paddingTop: 22 }}>
        <NavigationEvents onDidFocus={this._firstCall.bind(this)} />
        {view}
      </View>
    );
  }
}
