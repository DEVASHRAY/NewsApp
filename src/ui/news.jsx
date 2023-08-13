import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  removeLocallyStoredNews,
  storeNewsLocally,
} from '../helpers/localNewsStorage';
import fetchAllNews from '../api/allNews';
import {useNewsStore} from '../zustand/useNewsStore';
import generateUniqueIndex from '../helpers/pickRandomNews';
import {errorToast, infoToast, successToast} from '../helpers/toast';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import NewsCard from './newsCard';

const ADD_ITEM_COUNT = 10;

export default function News() {
  const newsData = useNewsStore(({newsData}) => newsData);
  const pinnedNewsData = useNewsStore(({pinnedNewsData}) => pinnedNewsData);

  const updateNewsData = useNewsStore(({updateNewsData}) => updateNewsData);
  const updatedPinnedNewsData = useNewsStore(
    ({updatedPinnedNewsData}) => updatedPinnedNewsData,
  );

  const [newsList, setNewsList] = useState([]);
  const [pageNo, setPageNo] = useState(2);
  const [fetchMoreNews, setFetchMoreNews] = useState(true);

  // Add first 10 items in the news list array to be rendered on load
  useEffect(() => {
    if (newsData?.length > 0) {
      setNewsList(newsData?.slice(0, 15));
    }
  }, [newsData]);

  // updates top 5 news in the list in a interval of 10 seconds
  useEffect(() => {
    let timer;

    if (timer || !newsData) return;
    timer = setInterval(() => {
      let randomNoSet = generateUniqueIndex(5, 10, 99);

      let randomNewsArray = [];
      randomNoSet.forEach(index => {
        randomNewsArray = [...randomNewsArray, newsData[index]];
      });

      setNewsList(prev => {
        if (prev.length <= 10) {
          return [...randomNewsArray, prev];
        } else {
          return [...randomNewsArray, ...prev.slice(5)];
        }
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [newsData]);

  // function to fetch next batch of news
  async function getNews() {
    try {
      let {articles = []} = await fetchAllNews({
        page: pageNo,
      });
      if (articles.length > 0) {
        setPageNo(prev => prev + 1);
        successToast({toastTitle: 'News Updated'});
        removeLocallyStoredNews();
        storeNewsLocally(articles || []);
        updateNewsData(articles || []);
      }
    } catch (err) {
      console.log('err in getting news', err);
      errorToast({
        toastTitle: 'Unable to refresh.,',
        toastDescription: 'Please try again after sometime.',
      });
      setFetchMoreNews(false);
    }
  }

  const rightSwipe = ({item, isPinnedNews, index, swipableRef}) => {
    return (
      <Animated.View style={[styles.swipeOptionView]}>
        <TouchableOpacity
          style={[styles.optionView, styles.pin]}
          onPress={() => {
            swipableRef?.current?.close();

            setTimeout(() => {
              if (isPinnedNews) {
                if (pinnedNewsData.length === 1) {
                  updatedPinnedNewsData([]);
                } else {
                  let pinnedNewsDataCopy = [...pinnedNewsData];
                  pinnedNewsDataCopy?.splice(index, 1);
                  updatedPinnedNewsData([...pinnedNewsDataCopy]);
                }

                return;
              }

              if (pinnedNewsData[0]?.title === item?.title) {
                infoToast({
                  toastTitle: 'The item is already pinned.',
                });
              } else if (pinnedNewsData.length > 1) {
                infoToast({
                  toastTitle: 'Only 2 pins available.',
                });
              } else {
                updatedPinnedNewsData([...pinnedNewsData, {...item}] || {});
              }
            }, 100);
          }}>
          <Image
            source={
              isPinnedNews
                ? require('../assets/images/png/unpin.png')
                : require('../assets/images/png/pin.png')
            }
            resizeMode="contain"
            style={[styles.optionImg]}
          />
        </TouchableOpacity>

        {!isPinnedNews && (
          <TouchableOpacity
            style={[styles.optionView, styles.delete]}
            onPress={() => {
              swipableRef?.current?.close();
              setTimeout(() => {
                const newsDataCopy = [...newsData];
                newsDataCopy?.splice(index, 1);
                updateNewsData([...newsDataCopy]);
              }, 100);
            }}>
            <Image
              source={require('../assets/images/png/delete.png')}
              resizeMode="contain"
              style={[styles.optionImg]}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    );
  };

  const renderItem = useCallback(
    ({index, item, isPinnedNews = false}) => {
      if (!item) return <></>;

      return (
        <NewsCard
          item={item}
          rightSwipe={rightSwipe}
          isPinnedNews={isPinnedNews}
          index={index}
        />
      );
    },
    [newsList, pinnedNewsData, newsData],
  );

  const keyExtractor = useCallback(
    item => {
      return item?.title + Math.random() * 234;
    },
    [newsData],
  );

  const onEndReached = () => {
    let itemCount = newsList.length;
    let totalItemCount = newsData.length;
    let noOfItemsToBeAdded = ADD_ITEM_COUNT;

    if (itemCount > 0 && itemCount === totalItemCount) {
      if (fetchMoreNews) {
        getNews();
        return;
      }

      return;
    } else if (itemCount + noOfItemsToBeAdded > totalItemCount) {
      noOfItemsToBeAdded = totalItemCount - itemCount;
    }

    setNewsList(newsData?.slice(0, itemCount + noOfItemsToBeAdded));
  };

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator size={'large'} style={{marginBottom: 12}} />;
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={[styles.headerText]}>Latest News</Text>

      {pinnedNewsData?.map((item, index) => (
        <View key={item?.description + Math.random() * 234}>
          {renderItem(
            {
              index,
              item,
              isPinnedNews: true,
            } || {},
          )}
        </View>
      ))}

      <FlatList
        data={newsList || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        ListFooterComponent={listFooterComponent}
        onEndReachedThreshold={0.8}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  swipeOptionView: {
    width: 88,
  },
  optionImg: {
    width: 24,
    height: 24,
  },
  optionView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pin: {
    backgroundColor: '#FBAA29',
  },
  delete: {
    backgroundColor: '#DD1B1B',
  },
  headerText: {
    paddingTop: 16,
    marginBottom: 12,
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
});
