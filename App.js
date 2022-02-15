import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const dataList = [
  { id: 1, image: require("./assets/alphabet-flashcards-1.jpg") },
  { id: 2, image: require("./assets/alphabet-flashcards-2.jpg") },
  { id: 3, image: require("./assets/alphabet-flashcards-3.jpg") },
  { id: 4, image: require("./assets/alphabet-flashcards-4.jpg") },
  { id: 5, image: require("./assets/alphabet-flashcards-5.jpg") },
  { id: 6, image: require("./assets/alphabet-flashcards-6.jpg") },
  { id: 7, image: require("./assets/alphabet-flashcards-7.jpg") },
  { id: 8, image: require("./assets/alphabet-flashcards-8.jpg") },
  { id: 9, image: require("./assets/alphabet-flashcards-1.jpg") },
  { id: 10, image: require("./assets/alphabet-flashcards-2.jpg") },
  { id: 11, image: require("./assets/alphabet-flashcards-3.jpg") },
  { id: 12, image: require("./assets/alphabet-flashcards-4.jpg") },
  { id: 13, image: require("./assets/alphabet-flashcards-5.jpg") },
  { id: 14, image: require("./assets/alphabet-flashcards-6.jpg") },
  { id: 15, image: require("./assets/alphabet-flashcards-7.jpg") },
  { id: 16, image: require("./assets/alphabet-flashcards-8.jpg") },
];

const numColumns = 4;
const WIDTH = Dimensions.get("window").width;

export default function App() {
  const [FlippedCards, setFlippedCards] = React.useState([]);

  const getShuffledArr = (arr) => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };
  const [newData, setNewData] = React.useState(getShuffledArr(dataList));
  const [matches, setMatches] = React.useState(0);
  const [attempts, setAttempts] = React.useState(0);
  const [matchedCards, setMatchedCards] = React.useState([]);

  const onPress = (item) => {
    if (FlippedCards.length === 0) {
      setFlippedCards([...FlippedCards, item]);
    } else if (FlippedCards.length === 1) {
      if (FlippedCards[0].id !== item.id) {
        if (FlippedCards[0].image === item.image) {
          setMatches(matches + 1);
          setMatchedCards([...matchedCards, item, FlippedCards[0]]);
        } else {
          setAttempts(attempts + 1);
        }
        setFlippedCards([...FlippedCards, item]);

        setTimeout(() => {
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const renderItem = ({ item, index }) => {
    let { itemStyle, itemText } = styles;
    return matchedCards.filter((e) => e.id === item.id).length > 0 ? (
      <Image
        source={require("./assets/empty-card.png")}
        style={{
          width: WIDTH / numColumns,
          height: WIDTH / numColumns,
        }}
      />
    ) : (
      <TouchableOpacity onPress={() => onPress(item)}>
        {FlippedCards.filter((e) => e.id === item.id).length > 0 ? (
          <Image
            source={item.image}
            style={{
              width: WIDTH / numColumns,
              height: WIDTH / numColumns,
            }}
          />
        ) : (
          <Image
            source={require("./assets/antique-playing-card.jpg")}
            style={{
              width: WIDTH / numColumns,
              height: WIDTH / numColumns,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  let { container, itemText } = styles;
  return (
    <View style={container}>
      <FlatList
        data={newData}
        numColumns={numColumns}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.viewStyle}>
        <Text
          style={[
            styles.textStyle,
            {
              color: "red",
            },
          ]}
        >
          Attempts: {attempts}
        </Text>
        <Text
          style={[
            styles.textStyle,
            {
              color: "green",
            },
          ]}
        >
          Matches: {matches}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemStyle: {
    backgroundColor: "#3232ff",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    flex: 1,
    margin: 1,
    height: WIDTH / numColumns,
  },
  itemText: {
    color: "#fff",
    fontSize: 30,
  },
  textStyle: {
    fontSize: 22,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
});
