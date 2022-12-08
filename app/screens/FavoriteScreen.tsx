import React, { FC, useEffect, useState } from "react"
import * as Application from "expo-application"
import { Linking, Platform, TextStyle, View, ViewStyle, Image, TouchableOpacity, Dimensions, FlatList, RefreshControl, LogBox } from "react-native"
import { Button, ListItem, Screen, Text } from "../components"
import { BottomTabScreenProps } from "../navigators/BottomNavigator"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { observer } from "mobx-react-lite"
import { load, save } from "../utils/storage"
import { FAVORITE_ARRAY, USER_FAVORITE } from "../utils/storage/storage_keys"
const { height, width } = Dimensions.get('window')

LogBox.ignoreLogs(["Warning: ..."]) // Ignore log notification by message

export const FavoriteScreen: FC<BottomTabScreenProps<"home">> = observer(() => {

  const [FavoriteData, setFavoriteData] = useState([])
  const [refreshing, setRefreshing] = useState(false)


  useEffect(() => {
    getfavorites()
  }, [])


  const getfavorites = async () => {
    const data = await load(USER_FAVORITE)
    setFavoriteData(data)
    console.log('fav data', FavoriteData)

  }
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getfavorites()
    wait(1000).then(() => {
      getfavorites()
      setRefreshing(false)
    })
  }, [])

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  const deleteFromFavorites = async (index) => {
    console.log(index)
    try{
      let FavArray = await load(USER_FAVORITE);
      // let FavArray = JSON.parse(FavArrayJSON);
      let alteredUsers = FavArray.filter(function(e){
          return e.fullName !== index
      })
      console.log('altered users',alteredUsers)
      await save(USER_FAVORITE, alteredUsers).then();
      // this.setState({
      //    users:alteredUsers
      // })
  }
  catch(error){
      console.log(error)
  }
  }

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{ backgroundColor: 'white', height: 70, alignItems: 'center' }}>
        <Image source={require('../../assets/myIcons/logo.png')} style={{ marginTop: 22, height: 40, width: 40 }} />
      </View>
      <FlatList
        data={FavoriteData}
        keyExtractor={(key) => {
          return key.index
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item, index }) => {
          return (
            <View style={{ backgroundColor: 'white' }}>
              <View style={{ backgroundColor: '#AFB1BA', height: 0.5 }}></View>
              <View style={{ flexDirection: 'row', marginLeft: 10, marginVertical: 10 }}>
                <Image
                  source={{ uri: item.profile_pic }}
                  style={{ height: 40, width: 40, borderRadius: 20 }}
                />
                <Text style={{ alignSelf: 'center', marginLeft: 8 }}>{item.fullName}</Text>
              </View>
              <View>
              </View>
              <TouchableOpacity style={{ position: 'absolute', right: 20, marginTop: 15, alignItems: 'center' }}
                onPress={() => {
                  deleteFromFavorites(item.fullName)
                }}
              >
                <Image source={require('../../assets/myIcons/fill_star.png')} />
              </TouchableOpacity>
            </View>
          )
        }}
      />

    </View>
  )

})