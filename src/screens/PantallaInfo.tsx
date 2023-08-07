import * as React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Card, IconButton, MD3Colors, Text} from 'react-native-paper';

const PantallaInfo = () => {
  const openTwitter = () => {
    Linking.openURL('https://twitter.com/kabeza');
  };

  const openGithub = () => {
    Linking.openURL('https://github.com/kabeza');
  };

  return (
    <View style={estilo.contenedor}>
      <Card mode="outlined" style={{width: '90%'}}>
        <Card.Content style={{padding:10, alignItems:'center'}}>
          <Text variant="displayLarge">Info</Text>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex:1}}>
              <Text variant="bodyLarge">Autor</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent:'flex-start',
                alignItems:'center',
              }}>
              <IconButton
                icon="twitter"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => openTwitter()}
              />
              <Text variant="bodyLarge" onPress={() => openTwitter()}>
                @kabeza
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingLeft: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex:1}}>
              <Text variant="bodyLarge">Web</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent:'flex-start',
                alignItems:'center',
              }}>
              <IconButton
                icon="web"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => openGithub()}
              />
              <Text variant="bodyLarge" onPress={() => openGithub()}>
                Github
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PantallaInfo;

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
