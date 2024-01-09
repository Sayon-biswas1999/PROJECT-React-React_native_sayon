import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const IPOCalendar = () => {
  const [ipoData, setIPOData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIPOData = async () => {
      try {
        const response = await axios.get('https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_3a32cbeded39453aa11bc7fac06f97db');
        setIPOData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching IPO data:', error);
        setLoading(false);
      }
    };

    fetchIPOData();
  }, []);

  return (
    <View>
      <Text>Upcoming IPOs</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={ipoData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
        />
      )}
    </View>
  );
};

export default IPOCalendar;
