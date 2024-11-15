import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocale } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import { Article } from '../../Shared/Article';
import { Chat } from '../../Shared/Chat';
import { Contacts } from '../../Shared/Contacts';

type Route = {
  key: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
};

const renderScene = SceneMap({
  chat: () => <Chat bottom />,
  contacts: () => <Contacts />,
  article: () => <Article />,
});

export const TabBarIcon = () => {
  const { direction } = useLocale();
  const [index, onIndexChange] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'chat', icon: 'chatbubbles' },
    { key: 'contacts', icon: 'people' },
    { key: 'article', icon: 'list' },
  ]);

  const renderIcon = React.useCallback((props: { route: Route }) => {
    return <Ionicons name={props.route.icon} {...props} />;
  }, []);

  const renderTabBar: React.ComponentProps<
    typeof TabView<Route>
  >['renderTabBar'] = (props) => (
    <TabBar
      {...props}
      direction={direction}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      contentContainerStyle={styles.tabbarContentContainer}
      gap={20}
    />
  );

  return (
    <TabView<Route>
      lazy
      navigationState={{
        index,
        routes,
      }}
      commonOptions={{
        icon: renderIcon,
      }}
      direction={direction}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={onIndexChange}
    />
  );
};

TabBarIcon.options = {
  title: 'Top tab bar with icons',
  headerShadowVisible: false,
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#e91e63',
  },
};

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#e91e63',
  },
  tabbarContentContainer: {
    paddingHorizontal: '10%',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
});
