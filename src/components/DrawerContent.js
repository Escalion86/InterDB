import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { useTheme, Drawer } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { AppContext } from '../AppContext'
import { iconSize, fontSize } from '../theme'

const DrawerContent = (props) => {
  const theme = useTheme()
  const { colors } = theme

  const { dev } = useContext(AppContext)

  const labelStyle = {
    fontSize: fontSize.medium,
    color: colors.text,
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* <Drawer.Section style={styles.drawerSection}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={require('../../assets/avatar/male.jpg')}
                  size={50}
                />
                <View
                  style={{
                    marginLeft: 15,
                    flexDirection: 'column',
                    // borderWidth: 1,
                    // borderColor: "red",
                  }}
                >
                  <Title style={{ ...styles.title, fontSize: fontSize.medium }}>
                    Алексей Белинский
                  </Title>
                  <Caption
                    style={{ ...styles.caption, fontSize: fontSize.small }}
                  >
                    @escalion
                  </Caption>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph
                    style={{
                      ...styles.paragraph,
                      ...styles.caption,
                      fontSize: fontSize.small,
                    }}
                  >
                    80
                  </Paragraph>
                  <Caption
                    style={{ ...styles.caption, fontSize: fontSize.small }}
                  >
                    Following
                  </Caption>
                </View>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    100
                  </Paragraph>
                  <Caption
                    style={{ ...styles.caption, fontSize: fontSize.small }}
                  >
                    Followers
                  </Caption>
                </View>
              </View>
            </View>
          </Drawer.Section> */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="md-calendar"
                  size={iconSize.small}
                  color={colors.icon}
                  // style={{ marginLeft: 5 }}
                />
              )}
              label="События"
              labelStyle={labelStyle}
              onPress={() => {
                props.navigation.navigate('Events')
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="md-people"
                  size={iconSize.small}
                  color={colors.icon}
                  // style={{ marginLeft: 5 }}
                />
              )}
              label="Клиенты"
              labelStyle={labelStyle}
              onPress={() => {
                props.navigation.navigate('Clients')
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="md-briefcase"
                  size={iconSize.small}
                  color={colors.icon}
                  // style={{ marginLeft: 5 }}
                />
              )}
              label="Услуги"
              labelStyle={labelStyle}
              onPress={() => {
                props.navigation.navigate('Services')
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="ios-cash"
                  size={iconSize.small}
                  color={colors.icon}
                  // style={{ marginLeft: 5 }}
                />
              )}
              label="Финансы"
              labelStyle={labelStyle}
              onPress={() => {
                props.navigation.navigate('Finances')
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Настройки">
            <TouchableRipple
              onPress={() => {
                setDark(!theme.dark)
              }}
            >
              <View style={styles.preference}>
                <Text>Тёмная тема</Text>
                <View pointerEvents="none">
                  <Switch value={theme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="md-settings"
              size={iconSize.small}
              color={colors.icon}
              // style={{ marginLeft: 5 }}
            />
          )}
          label="Настройки"
          labelStyle={labelStyle}
          onPress={() => {
            props.navigation.navigate('Settings')
          }}
        />
        {/* <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="md-information-circle-outline"
              size={iconSize.small}
              color={colors.icon}
              // style={{ marginLeft: 5 }}
            />
          )}
          label="О приложении"
          labelStyle={labelStyle}
          onPress={() => {
            props.navigation.navigate('About')
          }}
        /> */}
        {dev ? (
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons
                name="md-bug"
                size={iconSize.small}
                color={colors.icon}
                // style={{ marginLeft: 5 }}
              />
            )}
            label="Панель разработчика"
            labelStyle={labelStyle}
            onPress={() => {
              props.navigation.navigate('Dev')
            }}
          />
        ) : null}
        {/* <DrawerItem
          icon={() => (
            <Ionicons
              name="ios-log-out"
              size={22}
              color={colors.icon}
              style={{ marginLeft: 5 }}
            />
          )}
          label="Выход"
        /> */}
      </Drawer.Section>
    </View>
  )
}

export default DrawerContent

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    height: 75,
  },
  // title: {
  //   // marginTop: 3,
  //   fontWeight: 'bold',
  //   marginTop: 0,
  // },
  // caption: {
  //   lineHeight: 14,
  //   marginTop: 0,
  // },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    // marginTop: 15,
  },
  bottomDrawerSection: {
    // marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
