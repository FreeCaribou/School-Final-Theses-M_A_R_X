import { AsyncStorage } from "react-native";
import { Alert } from "react-native";

const baseUrl = "http://10.0.2.2:12345/api/";

const verifyStatut = response => {
  console.log(response);
  let tmp = JSON.parse(response._bodyText);
  console.log(tmp);
  let messageToShow = "";

  tmp.message.forEach((e, k) => {
    messageToShow += e;
    if (k + 1 != tmp.message.length) {
      messageToShow += " / ";
    }
  });

  Alert.alert("Error", messageToShow);
};

export const getRoute = async route => {
  console.log(route);
  try {
    const bearer = await AsyncStorage.getItem("Bearer");
    return fetch(`${baseUrl}${route}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`
      }
    }).then(response => {
      if (!response.ok) {
        verifyStatut(response);
      }
      return response.json();
    });
  } catch (error) {
    // Error retrieving data
  }
};

export const postRoute = async (route, body) => {
  try {
    const bearer = await AsyncStorage.getItem("Bearer");
    return fetch(`${baseUrl}${route}`, {
      body: body,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`
      }
    }).then(response => {
      if (!response.ok) {
        verifyStatut(response);
      }
      return response.json();
    });
  } catch (error) {
    // Error retrieving data
  }
};

export const deleteRoute = async (route, body) => {
  try {
    const bearer = await AsyncStorage.getItem("Bearer");
    return fetch(`${baseUrl}${route}`, {
      body: body,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`
      }
    }).then(response => {
      if (!response.ok) {
        verifyStatut(response);
      }
      return response.json();
    });
  } catch (error) {
    // Error retrieving data
  }
};

export const putRoute = async (route, body) => {
  try {
    const bearer = await AsyncStorage.getItem("Bearer");
    return fetch(`${baseUrl}${route}`, {
      body: body,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`
      }
    }).then(response => {
      if (!response.ok) {
        verifyStatut(response);
      }
      return response.json();
    });
  } catch (error) {
    // Error retrieving data
  }
};
