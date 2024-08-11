import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getToken } from '@/apisetup/securedToken';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
      const callToken = async () => {
        const token = await getToken()
        if (!token) {
          router.replace('/')
        }
      }

      callToken()
  },[])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="productslist"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="productdetails"
        options={{
          title: 'Details',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
