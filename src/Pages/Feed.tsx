import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { IDevocional } from "../../declarations";
import Post from "../Components/Post";
import api from "../Services/api";

const FeedContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #127c82;
`;

type TabParamList = {
  Home: undefined;
  Ranking: undefined;
  Desafios: undefined;
  Configs: undefined;
};

export enum Screens {
  HOME = "Home",
  RANKING = "Ranking",
  DESAFIOS = "Desafios",
  CONFIGS = "Configs",
}

export interface TabBarProps {
  navigation: BottomTabNavigationProp<TabParamList, Screens>;
}

const Feed = ({ navigation }: TabBarProps) => {
  const [posts, setPosts] = useState<IDevocional[]>([] as IDevocional[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        await api.get("/devocional").then(({ data }) => {
          setPosts(data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      try {
        setLoading(true);
        await api.get("/devocional").then(({ data }) => {
          setPosts(data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <FeedContainer>
      <FlatList
        data={posts}
        style={{ paddingHorizontal: 20 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={Post}
        refreshing={loading}
      />
    </FeedContainer>
  );
};

export default Feed;
