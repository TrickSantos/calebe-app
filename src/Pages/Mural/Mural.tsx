import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components/native";
import { MuralStackParamList } from "../../Routes/mural.routes";
import { StackScreenProps } from "@react-navigation/stack";
import { FAB } from "react-native-paper";
import { IFoto } from "../../../declarations";
import { useAuth } from "../../Context/AuthContext";
import api from "../../Services/api";
import FotoMural from "../../Components/FotoMural";

type Props = StackScreenProps<MuralStackParamList, "Mural">;

const { width } = Dimensions.get("window");

const Mural = ({ navigation }: Props) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [fotos, setFotos] = useState<IFoto[]>([] as IFoto[]);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      try {
        setLoading(true);
        await api.get(`/foto?page=${page}`).then(({ data }) => {
          setFotos(data.data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        await api.get(`/foto?page=${page}`).then(({ data }) => {
          setFotos(fotos.concat(data.data));
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

  const loadMore = () => {
    if (pageSize > page) {
      setPage(page + 1);
    }
  };

  return (
    <Container>
      <View style={{ alignItems: "center" }}>
        <Text>Mural das Equipes</Text>
      </View>
      <FlatList
        data={fotos}
        showsVerticalScrollIndicator={false}
        keyExtractor={(foto) => foto.id.toString()}
        refreshing={loading}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#fff" /> : null
        }
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        renderItem={({ item }) => <FotoMural {...item} />}
      />
      {user ? (
        <FAB
          style={{ position: "absolute", margin: 25, right: 0, bottom: 0 }}
          small
          icon="plus"
          onPress={() => navigation.navigate("Adicionar", { userId: user.id })}
        />
      ) : null}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  width: ${width}px;
  background-color: #127c82;
`;

const Text = styled.Text`
  color: #fff;
  font-family: "Poppins";
  font-size: 18px;
  font-weight: 500;
  margin: 1rem 0;
`;

export default Mural;
