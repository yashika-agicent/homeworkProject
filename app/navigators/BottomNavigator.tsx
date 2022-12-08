import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { Image, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { FavoriteScreen } from "../screens"
import { HomeScreen } from "../screens/HomeScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type BottomTabParamList = {
  home: undefined
  favorite: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type BottomTabScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<BottomTabParamList>()

export function BottomNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: "#E12D6E",
        tabBarInactiveTintColor: "#E12D6E",
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >

      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => <Image source={focused ? require('../../assets/myIcons/fill_home.png'): require('../../assets/myIcons/outline_home.png')} />,
        }}
      />

      <Tab.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Favorite",
          tabBarIcon: ({ focused }) => <Image source={focused ? require('../../assets/myIcons/fill_star.png'): require('../../assets/myIcons/outline_star.png')} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
