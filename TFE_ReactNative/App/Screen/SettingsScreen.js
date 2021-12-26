import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert
} from "react-native";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this._onPressButtonChangeLang = this._onPressButtonChangeLang.bind(this);
  }

  _onPressButtonChangeLang(lang) {
    // Alert.alert("You tapped the button! " + lang);
    this.props.screenProps.changeLanguage(lang);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
        {/* Illustration de comment activer un bouton de deux manière différente */}
        <Button
          onPress={this._onPressButtonChangeLang.bind(this, "fr")}
          title="Français"
        />
        <Button
          onPress={() => this._onPressButtonChangeLang("en")}
          title="English"
        />
      </View>
    );
  }
}
