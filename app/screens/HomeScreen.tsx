// Interested in migrating from FlatList to FlashList? Check out the recipe in our Ignite Cookbook
// https://infinitered.github.io/ignite-cookbook/docs/MigratingToFlashList
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import {
  AccessibilityProps,
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  LogBox,
} from "react-native"
import { BottomTabScreenProps } from "../navigators/BottomNavigator"
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import { clear, load, save } from "../utils/storage";
import { FAVORITE_ARRAY, USER_FAVORITE } from "../utils/storage/storage_keys";
const { height, width } = Dimensions.get('window')

LogBox.ignoreLogs(["Warning: ..."]) // Ignore log notification by message

export const HomeScreen: FC<BottomTabScreenProps<"home">> = observer(() => {

  const [refreshing, setRefreshing] = useState(false)
  const [results, setResults] = useState([])
  const [Loading, setLoading] = useState(false)
  const [favourite, setFavorite] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number>()

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    renderAPIResponse()
    wait(1000).then(() => {
      renderAPIResponse()
      setRefreshing(false)
    })
  }, [])
  let finalArray = [];

  const addToFavorites = async (index) => {
    // console.log(results[index])
    // finalArray.push(results[index])
    await load(USER_FAVORITE)
      .then(favs => {
        favs = favs == null ? [] : favs

        favs.push(results[index])

        return save(USER_FAVORITE, favs)
      })
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  useEffect(() => {
    renderAPIResponse()
  }, [])

  const renderAPIResponse = async () => {
    axios
      .get(
        `https://randomapi.com/api/277ecb38e1f837c937a71931a3d1d01e`,
      )
      .then((response) => {
        setResults(response.data.results[0])
        // console.log('APIResponse', results)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteFromFavorites = async (index) => {
    console.log(index)
    try {
      let FavArray = await load(USER_FAVORITE);
      // let FavArray = JSON.parse(FavArrayJSON);
      let alteredUsers = FavArray.filter(function (e) {
        return e.fullName !== index
      })
      console.log('altered users', alteredUsers)
      await save(USER_FAVORITE, alteredUsers).then();
      // this.setState({
      //    users:alteredUsers
      // })
    }
    catch(error){
      console.log(error)
  }
  }
  // console.log('APIResponse', results)

  return (
    <View>
       <View style={{ backgroundColor: 'white', height: 70, alignItems: 'center' }}>
        <Image source={require('../../assets/myIcons/logo.png')} style={{ marginTop: 22, height: 40, width: 40 }} />
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {results.map((data, index) => {
          return (
            <View style={{ marginTop: 10, backgroundColor: 'white', height: 75, width: width - 50, borderRadius: 10, alignSelf: 'center' }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ backgroundColor: 'white', height: 58, width: 58, borderRadius: 30, top: 12, right: 20 }}>
                  <Image
                    source={{ uri: data.profile_pic }}
                    style={{ height: 50, width: 50, borderRadius: 25, alignSelf: 'center', zIndex: 1 }}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{data.fullName}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 1, marginBottom: 8 }}>
                      <MaterialIcons name="location-on" size={11} color='#AFB1BA' style={{ alignSelf: 'center' }} />
                      <Text style={{ color: '#AFB1BA', fontSize: 11 }}>{data.address}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      {
                        data.intrests.map((int) => {
                          return (
                            <View style={{ marginHorizontal: 2, borderRadius: 2, backgroundColor: 'rgba(52, 52, 52, 0.2)', }}>
                              <Text style={{ fontSize: 10, color: 'black', }}>{int}</Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                  <TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', left: width - 150 }}
                    onPress={() => {
                      setFavorite(!favourite)
                      setSelectedItem(index)
                      favourite ? 
                      deleteFromFavorites(data.fullName)
                      :
                      addToFavorites(index)
                    }}
                  >

                    {favourite && selectedItem === index ?
                      <Image source={require('../../assets/myIcons/fill_star.png')} />
                      :
                      <Image source={require('../../assets/myIcons/outline_star.png')} />
                    }
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
})
const styles = StyleSheet.create({

})

// #region Styles
