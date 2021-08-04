import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import styled from "styled-components/native";
import { IDevocional } from "../../../declarations";
import Post from "../../Components/Post";
import api from "../../Services/api";
import { StackScreenProps } from "@react-navigation/stack";
import { ActivityIndicator } from "react-native-paper";
import { FeedStackParamList } from "../../Routes/feed.routes";
import { StatusBar } from "expo-status-bar";

const FeedContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #127c82;
`;

type Props = StackScreenProps<FeedStackParamList, "Feed">;

const Feed = ({ navigation }: Props) => {
  const [posts, setPosts] = useState<IDevocional[]>([] as IDevocional[]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        await api
          .get(`/devocional?status=true&page=${page}`)
          .then(({ data }) => {
            setPosts(posts.concat(data.data));
            setPageSize(data.meta.lastPage);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, [page]);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      try {
        setLoading(true);
        await api
          .get(`/devocional?status=true&page=${page}`)
          .then(({ data }) => {
            setPosts(data.data);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const loadMore = () => {
    if (pageSize > page) {
      setPage(page + 1);
    }
  };

  return (
    <FeedContainer>
      <StatusBar backgroundColor="#127c82" animated />
      <FlatList
        data={posts}
        style={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post post={item} />}
        refreshing={loading}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#fff" /> : null
        }
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
      />
    </FeedContainer>
  );
};

export default Feed;
