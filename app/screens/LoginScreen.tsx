import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, ViewStyle, View, Dimensions, Image, Text, LogBox } from "react-native"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing, typography } from "../theme"
const { height, width } = Dimensions.get('screen')
import { Feather } from '@expo/vector-icons';
import { clear } from "../utils/storage"
import {Snackbar} from 'react-native-paper'

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }
LogBox.ignoreLogs(["Warning: ..."]) // Ignore log notification by message


export const LoginScreen: FC<LoginScreenProps> = observer(({ navigation }) => {

  const [emailActive, setEmailActive] = useState(false)
  const [PasswordActive, setPasswordActive] = useState(false)
  const [Email, setEmail] = useState<string>()
  const [Password, setPassowrd] = useState<string>()
  const [ErrorMessage, setErrorMessage] = useState<string>()
  const [ShowSnackBar, setShowSnackBar] = useState(false)
  const [isSecureEntry, setisSecureEntry] = useState(true)

  const validate = () => {
    if (Email == "" || Password == "") {
      setErrorMessage("Please fill all the details")
      setShowSnackBar(true)
    } else if (Email !== "reactnative@jetdevs.com" && Password !== "jetdevs@123") {
      setErrorMessage("Please fill correct details")
      setShowSnackBar(true)
    } else {
      clear()
      navigation.navigate("Demo")
    }
  }
  return (
    <>
      <View style={{ flex: 1, marginTop: 100 }}>

        <View style={{ alignSelf: 'center', borderRadius: 5, backgroundColor: 'white', height: height - (height / 3.5), width: width - 50 }}>
          <View style={{ marginTop: 100, }}>
            <Text style={{ alignSelf: 'center', fontSize: 19, fontWeight: 'bold' }}>LOGIN</Text>
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 50 }}>
            <View style={{ flexDirection: 'row' }}>
              {emailActive ?
                <Image
                  source={require('../../assets/myIcons/email_active.png')}
                  style={{ alignSelf: 'center' }}
                />
                :
                <Image
                  source={require('../../assets/myIcons/email_inactive.png')}
                  style={{ alignSelf: 'center' }}
                />
              }

              <TextInput
                placeholder="Email"
                style={{ marginLeft: 10 }}
                onFocus={() => { setEmailActive(true) }}
                value={Email}
                onChangeText={setEmail}
                autoCapitalize='none'
              />
            </View>
            {
              emailActive ?
                <View style={{ width: width - 90, backgroundColor: "deeppink", height: 1.25, marginTop: 8 }}></View>
                :
                <View style={{ width: width - 90, backgroundColor: "#AFB1BA", height: 1.52, marginTop: 8 }}></View>
            }
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 50 }}>
            <View style={{ flexDirection: 'row' }}>
              <Feather name="lock" size={24} color={PasswordActive ? "deeppink" : "#AFB1BA"} style={{ alignSelf: 'center' }} />
              <TextInput
                placeholder="Password"
                style={{ marginLeft: 10, width: 150 }}
                onFocus={() => { setPasswordActive(true) }}
                value={Password}
                onChangeText={setPassowrd}
                autoCapitalize='none'
                secureTextEntry={true}
              />
            </View>
            <View style={{ width: width - 90, backgroundColor: PasswordActive ? "deeppink" : "#AFB1BA", height: 1, marginTop: 8 }}></View>
          </View>

          <TouchableOpacity style={{ alignSelf: 'center', marginTop: 100, height: 40, width: width - 90, backgroundColor: "deeppink", borderRadius: 5, justifyContent: 'center' }}
            onPress={() => {
              validate()
            }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', alignSelf: 'center' }}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', backgroundColor: 'white', bottom: height - (height / 4), height: 80, width: 80, borderRadius: 40, alignSelf: 'center', }}>
          <Image source={require('../../assets/myIcons/logo.png')} style={{ alignSelf: 'center' }} />
        </View>

      </View>

      <Snackbar
        visible={ShowSnackBar}
        onDismiss={() => setShowSnackBar(false)}
        action={{
          // icon: "close",
          color: "white", // <---- Add this.
          label: "OK",
          onPress: () => {
            setShowSnackBar(false)
          },
        }}
        style={{ backgroundColor: "blue" }}
      >
        <View>
          <Text style={{ color: "white" }}>{ErrorMessage}</Text>
        </View>
      </Snackbar>
    </>

  )
})


