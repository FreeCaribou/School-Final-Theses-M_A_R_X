import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { Localization } from "expo-localization";
import i18n from "i18n-js";
import SettingsScreen from "./App/Screen/SettingsScreen";
import HomeScreen from "./App/Screen/HomeScreen";
import en from "./lang/en.json";
import fr from "./lang/fr.json";
import { Platform, View, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";
import RelationshipScreen from "./App/Screen/RelationshipScreen";
import Colors from "./App/constants/Colors";
import NewRelationshipScreen from "./App/Screen/NewRelationshipScreen";
import RelationshipDetailScreen from "./App/Screen/RelationshipDetailScreen";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    currentLanguage: Localization.locale
  };

  _changeLanguage = language => {
    console.log("hello app lang change " + language);
    this.setState({ currentLanguage: language });
    i18n.locale = language;
  };

  componentDidMount() {
    // TODO this is not permanent
    AsyncStorage.setItem(
      "Bearer",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ3NTM3MTQ5fQ.30hY8cvPvekIlJoj65HYySYqHTWNlKVp_sZJlhqA8-E"
    );
    AsyncStorage.getItem("Bearer").then(data => console.log(data));
  }

  render() {
    i18n.locale = this.state.currentLanguage;
    i18n.fallbacks = true;
    i18n.translations = { en, fr };

    const screenProps = {
      changeLanguage: this._changeLanguage
    };

    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator
          screenProps={screenProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const RelationshipStack = createStackNavigator({
  Relationship: { screen: RelationshipScreen },
  NewRelationshipType: { screen: NewRelationshipScreen },
  RelationshipDetail: { screen: RelationshipDetailScreen }
});

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  NewRelationshipType: { screen: NewRelationshipScreen }
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen }
});

const AppNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeStack },
      Relationship: { screen: RelationshipStack },
      Settings: { screen: SettingsStack }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === "Home") {
            iconName = `ios-information-circle`;
          } else if (routeName === "Relationship") {
            iconName = `ios-people`;
          } else if (routeName === "Settings") {
            iconName = `ios-options`;
          }
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
      }),
      tabBarOptions: {
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.secondaryColor
      }
    }
  )
);
