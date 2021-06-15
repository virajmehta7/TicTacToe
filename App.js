import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initialize();
  }

  newGame = () => {
    this.initialize();
  }

  initialize = () => {
    this.setState({
      currentPlayer: 1,
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    })
  }

  winner = () => {
    var arr = this.state.gameState;

    if ((arr[0][0] != 0) && (arr[0][0] == arr[0][1]) && (arr[0][1] == arr[0][2])) {
      if (arr[0][0] == 1) { return 1; }
      else if (arr[0][0] == 2) { return 2; }
    }

    else if ((arr[1][0] != 0) && (arr[1][0] == arr[1][1]) && (arr[1][1] == arr[1][2])) {
      if (arr[1][0] == 1) { return 1; }
      else if (arr[1][0] == 2) { return 2; }
    }

    else if ((arr[2][0] != 0) && (arr[2][0] == arr[2][1]) && (arr[2][1] == arr[2][2])) {
      if (arr[2][0] == 1) { return 1; }
      else if (arr[2][0] == 2) { return 2; }
    }

    else if ((arr[0][0] != 0) && (arr[0][0] == arr[1][0]) && (arr[1][0] == arr[2][0])) {
      if (arr[0][0] == 1) { return 1; }
      else if (arr[0][0] == 2) { return 2; }
    }

    else if ((arr[0][1] != 0) && (arr[0][1] == arr[1][1]) && (arr[1][1] == arr[2][1])) {
      if (arr[0][1] == 1) { return 1; }
      else if (arr[0][1] == 2) { return 2; }
    }

    else if ((arr[0][2] != 0) && (arr[0][2] == arr[1][2]) && (arr[1][2] == arr[2][2])) {
      if (arr[0][2] == 1) { return 1; }
      else if (arr[0][2] == 2) { return 2; }
    }

    else if ((arr[0][0] != 0) && (arr[0][0] == arr[1][1]) && (arr[1][1] == arr[2][2])) {
      if (arr[0][0] == 1) { return 1; }
      else if (arr[0][0] == 2) { return 2; }
    }

    else if ((arr[0][2] != 0) && (arr[0][2] == arr[1][1]) && (arr[1][1] == arr[2][0])) {
      if (arr[0][2] == 1) { return 1; }
      else if (arr[0][2] == 2) { return 2; }
    }
  }

  Icon = (r, c) => {
    var value = this.state.gameState[r][c];
    switch (value) {
      case 1: return <Icon name="close" style={styles.tileX} />;
      case 2: return <Icon name="circle-outline" style={styles.tileO} />;
      default: return <View />;
    }
  }

  onTilePress = (r, c) => {
    var value = this.state.gameState[r][c];
    if (value !== 0) {
      return;
    }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();
    arr[r][c] = currentPlayer;
    this.setState({ gameState: arr });

    var nextPlayer = (currentPlayer == 1) ? 2 : 1;
    this.setState({ currentPlayer: nextPlayer });

    var winner = this.winner();
    if (winner == 1) {
      Alert.alert("Player 1 is the winner");
      this.newGame();
    }
    else if (winner == 2) {
      Alert.alert("Player 2 is the winner");
      this.newGame();
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text}>Player 1: X</Text>
        <Text style={styles.text}>Player 2: O</Text>
        <View style={{ paddingBottom: 50 }} />

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.Icon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.Icon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            {this.Icon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.Icon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.tile}>
            {this.Icon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.Icon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.Icon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.Icon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
            {this.Icon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 50 }} />
        <TouchableOpacity onPress={this.newGame}>
          <Text style={styles.text}>New Game</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
  },
  tile: {
    borderWidth: 3,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  tileX: {
    color: "red",
    fontSize: 65,
  },
  tileO: {
    color: "green",
    fontSize: 65,
  },
});