import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

export default class Movie extends Component {

  constructor(props) {
   super(props);
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.state = {
     dataSource: ds.cloneWithRows([
       'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
     ])
   };
 }

 render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovieCell}
          refreshControl={
               <RefreshControl
                 refreshing={false}
                 onRefresh={() => this._onRefresh.bind(this)}
               />
             }
             onEndReached={() => this._onEndReached()}
        />
      </View>
    );
  }
  _onEndReached(){
    alert("Ahah, onEndReached fired !!!")
  }

 _onRefresh(){
    // Reload again here
    this.getMoviesFromApiAsync()
 }

 _pressRow(){

 }
  renderMovieCell(rowData){
    return(
       <TouchableOpacity onPress={() => this._pressRow}>
        <View style={{flexDirection: 'row' , backgroundColor: 'orange' }} >
          <View  style={{ margin: 10 , flex: 3}} >
            <Image
               style={{ width: 100 , height: 120 }}
               source={{uri: 'https://image.tmdb.org/t/p/original' + rowData.poster_path }}
             />
          </View>
          <View style={{ flex: 7 }} >

            <Text style={{fontSize: 20 , paddingTop: 8,
               marginBottom: 16 , fontWeight: 'bold' }} >{rowData.title}</Text>
            <Text numberOfLines={5} >{rowData.overview}</Text>
          </View>

        </View>
       </TouchableOpacity>
    );
  }

 componentWillMount(){
    this.getMoviesFromApiAsync()

 }

 getMoviesFromApiAsync() {
      return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseJson.results)
          })
          return responseJson.movies;
        })
        .catch((error) => {
          console.error(error);
        });
    }

}


var styles = StyleSheet.create({

})
