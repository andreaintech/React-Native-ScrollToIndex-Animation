import 'react-native-reanimated';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import faker from 'faker';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('screen');

faker.seed(10);

const data = [...Array(20).keys()].map(() => ({
  key: faker.datatype.uuid(),
  job: faker.animal.crocodilia(),
}));

const _noSpacing = 0;
const _spacing = 10;

const _colors = {
  active: {
    background: `#FA4FB7`,
    text: `#FFFFFF`,
  },
  inactive: {
    background: `#FCD25900`,
    text: `#36303F`,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListStyle: { flexGrow: 0 },
  contentContainerStyle: { paddingLeft: _spacing },
  buttonStyle: {
    marginRight: _spacing,
    padding: _spacing,
    borderWidth: 2,
    borderColor: _colors.active.background,
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: '700',
  },
  bottomBar: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: _spacing * 10,
  },
  bottomBarItems: {
    alignItems: 'center',
  },
  title: {
    color: '#36303F',
    fontWeight: '700',
    marginBottom: _spacing,
  },
  contentItems: {
    flexDirection: 'row',
    width: width / 2,
    justifyContent: 'center',
  },
  arrowButton: {
    padding: _spacing,
    backgroundColor: _colors.active.background,
    borderRadius: _spacing,
  },
});

const App = () => {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [viewPosition, setViewPosition] = useState(0);

  useEffect(() => {
    ref.current?.scrollToIndex({
      animated: true,
      index,
      viewOffset: viewPosition === 0.5 || viewPosition === 1 ? _noSpacing : _spacing,
      viewPosition,  // percentage from the viewPort starting from left hanside
    });
  }, [index, viewPosition]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        initialScrollIndex={index}
        style={styles.flatListStyle}
        data={data}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity onPress={() => {
              setIndex(fIndex);
            }}>
              <MotiView
                animate={{
                  opacity: fIndex === index ? 1 : 0.3,
                }}
                transition={{
                  type: 'timing',
                  duration: 500,
                }}
                style={[
                  styles.buttonStyle,
                  { backgroundColor: fIndex === index ? _colors.active.background : _colors.inactive.background, }
                ]}>
                <Text style={[
                  styles.buttonText,
                  { color: fIndex === index ? _colors.active.text : _colors.inactive.text, }
                ]}>
                  {item.job}
                </Text>
              </MotiView>
            </TouchableOpacity>
          );
        }}
      />

      <View
        style={styles.bottomBar}>
        <View style={styles.bottomBarItems}>
          <Text
            style={styles.title}>
            Scroll position
          </Text>

          <View style={styles.contentItems}>
            <TouchableOpacity onPress={() => {
              setViewPosition(0);
            }}>
              <View
                style={[
                  styles.arrowButton,
                  { marginRight: _spacing, }
                ]}>
                <Entypo name='align-left' size={24} color='white' />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setViewPosition(0.5);
            }}>
              <View
                style={[
                  styles.arrowButton,
                  { marginRight: _spacing, }
                ]}>
                <Entypo name='align-horizontal-middle' size={24} color='white' />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setViewPosition(1);
            }}>
              <View
                style={styles.arrowButton}>
                <Entypo name='align-right' size={24} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomBarItems}>
          <Text
            style={styles.title}>
            Navigation
          </Text>

          <View style={styles.contentItems}>
            <TouchableOpacity onPress={() => {
              if (index === 0)
                return;
              setIndex(index - 1);
            }}>
              <View
                style={[
                  styles.arrowButton,
                  { marginRight: _spacing, }
                ]}>
                <Feather name='arrow-left' size={24} color='white' />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              if (index === data.length - 1)
                return;
              setIndex(index + 1);
            }}>
              <View
                style={styles.arrowButton}>
                <Feather name='arrow-right' size={24} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default App;
