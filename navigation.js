import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Feed from './screens/tabScreens/Feed';
import Settings from './screens/tabScreens/Settings';
import Notifications from './screens/tabScreens/Notification';
import Ionicons from '@expo/vector-icons/Ionicons';
import TweetDetailScreen from './screens/homeStack/TweetDetailScreen';
import Payments from './screens/drawerScreens/Payment';
import { Image, Pressable, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';


//create top tabs
const TopTabs = createMaterialTopTabNavigator()
function TopTabsStack({ navigation }) {
    return (
        <TopTabs.Navigator screenOptions={{
            tabBarLabelStyle: {
                textTransform: 'capitalize',
                fontWeight: 'bold'
            },
            tabBarIndicatorStyle: {
                height: 5,
                borderRadius: 5,
                backgroundColor: '#1DA1F2',
            },
        }}>
            <TopTabs.Screen name='main' component={Feed} />
            <TopTabs.Screen name='Following' component={Payments} />
            <TopTabs.Screen name='Followers' component={Payments} />
        </TopTabs.Navigator>
    )
}


//create stack instance
const HomeStack = createNativeStackNavigator()
function HomeStackGroup() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen component={TabGroup} name='TabGroup' />
            <HomeStack.Screen component={TweetDetailScreen} name='TweetDetailScreen' options={{
                presentation: "modal",
                headerTitle: "Tweet Details",
                headerShown: true,
            }} />

        </HomeStack.Navigator>
    )
}



//create bottom tab's instance
const Tab = createBottomTabNavigator();
function TabGroup({ navigation }) {
    return (
        <Tab.Navigator screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({ color, size, focused }) => {
                let iconName;
                if (route.name === 'Feed') {
                    iconName = focused ? 'home' : 'home-outline'
                }
                else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                }
                else if (route.name === 'Notifications') {
                    iconName = focused ? 'notifications' : 'notifications-outline'
                }
                return <Ionicons name={iconName} size={24} color={color} />
            },
            tabBarActiveTintColor: '#1DA1F2',
            tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen name='Feed' component={TopTabsStack} options={{
                tabBarLabel: 'Home',
                headerLeft: () => (
                    <Pressable onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require("./assets/hrithik.jpg")}
                            style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                        />
                    </Pressable>
                ),
            }} />
            <Tab.Screen name='Notifications' component={Notifications} />
            <Tab.Screen name='Settings' component={Settings} />

        </Tab.Navigator>
    )
}
//Drawer
const DrawerStack = createDrawerNavigator()
function DrawerStackGroup() {
    return (
        <DrawerStack.Navigator screenOptions={{ headerShown: false }}>
            <DrawerStack.Screen component={HomeStackGroup} name='HomeStackGroup' />
            <DrawerStack.Screen component={Payments} name='Payments' options={{ headerShown: true }} />
        </DrawerStack.Navigator>
    )
}

export default function Navigation() {
    const currentTheme = useColorScheme()
    return (
        <NavigationContainer
            theme={currentTheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <StatusBar style='auto' />
            <DrawerStackGroup />
        </NavigationContainer>
    )
}


// we can add HomeStack as well as Bottom Tab Group inside NavigationContainer
/* We added HomeStack group inside container due to TweetDetailScreen was presented as a modal.
In android it shows the header even if we present it as a modal
*/