import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { IEquipe } from "../../declarations";
import api from "../Services/api";
import { StackScreenProps } from "@react-navigation/stack";
import { RankingStackParamList } from "../Routes/app.routes";

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #127c82;
`;

const Scroll = styled.ScrollView``;

const Text = styled.Text`
  color: white;
  font-family: "Poppins";
  font-size: 18px;
  font-weight: 500;
  margin: 1rem 0;
`;

const Posicao = styled.Text`
  color: white;
  font-family: "Poppins";
  font-size: 14px;
`;

const Equipe = styled.Text`
  color: white;
  font-family: "Poppins";
  font-size: 14px;
`;

const Colocacao = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
`;

const Pontuacao = styled.Text`
  font-family: "Poppins";
  font-weight: 500;
  color: #5ceaa0;
  font-size: 18px;
`;

const PrimeiroContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const RankingContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const EquipeContainer = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #5ea6a9;
  border-radius: 30px;
  padding-right: 1rem;
`;

const PosicaoAvatar = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`;

const ColocacaoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 1rem;
  margin-top: -120px;
  width: 100%;
`;

const style = StyleSheet.create({
  shadowRanking: {
    borderColor: "#5CEAA0",
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "#5CEAA0",
    shadowOpacity: 1.0,
    shadowRadius: 20,
  },
  shadow: {
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  avatarBg: {
    backgroundColor: "#5ea6a9",
  },
});

type Props = StackScreenProps<RankingStackParamList, "Ranking">;

const Ranking = ({ navigation }: Props) => {
  const [equipes, setEquipes] = useState<IEquipe[]>([] as IEquipe[]);
  const [loading, setLoading] = useState(false);
  const [primeiro, setPrimeiro] = useState<IEquipe | undefined>(undefined);
  const [segundo, setSegundo] = useState<IEquipe | undefined>(undefined);
  const [terceiro, setTerceiro] = useState<IEquipe | undefined>(undefined);

  useEffect(() => {
    async function getEquipes() {
      setLoading(true);
      await api
        .get("/equipe")
        .then(({ data }) => {
          let temp: IEquipe[] = data;
          if (temp.length > 3) {
            setPrimeiro(temp.shift());
            setSegundo(temp.shift());
            setTerceiro(temp.shift());
          }
          setEquipes(temp);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
    getEquipes();
  }, []);

  return (
    <Container>
      <Text>Ranking de Equipes</Text>
      {loading ? (
        <Container>
          <ActivityIndicator animating={true} color="#fff" />
        </Container>
      ) : (
        <>
          {primeiro && segundo && terceiro && (
            <>
              <PrimeiroContainer>
                <PosicaoAvatar>
                  <Posicao>1</Posicao>
                  <MaterialCommunityIcons
                    name="crown"
                    size={24}
                    color="#CCB464"
                  />
                  {primeiro.avatar ? (
                    <Avatar.Image
                      style={style.shadowRanking}
                      source={{ uri: primeiro.avatar }}
                      size={80}
                    />
                  ) : (
                    <Avatar.Icon
                      style={style.shadowRanking}
                      icon="account"
                      size={80}
                    />
                  )}
                  <Equipe>{primeiro.nome}</Equipe>
                  <Pontuacao>0</Pontuacao>
                </PosicaoAvatar>
              </PrimeiroContainer>
              <ColocacaoContainer>
                <PosicaoAvatar>
                  <Posicao>2</Posicao>
                  <MaterialCommunityIcons
                    name="crown"
                    size={24}
                    color="#CCB464"
                  />
                  {segundo.avatar ? (
                    <Avatar.Image
                      style={style.shadowRanking}
                      source={{ uri: segundo.avatar }}
                      size={80}
                    />
                  ) : (
                    <Avatar.Icon
                      style={style.shadowRanking}
                      icon="account"
                      size={80}
                    />
                  )}
                  <Equipe>{segundo.nome}</Equipe>
                  <Pontuacao>0</Pontuacao>
                </PosicaoAvatar>
                <PosicaoAvatar>
                  <Posicao>3</Posicao>
                  <MaterialCommunityIcons
                    name="crown"
                    size={24}
                    color="#CCB464"
                  />
                  {terceiro.avatar ? (
                    <Avatar.Image
                      style={style.shadowRanking}
                      source={{ uri: terceiro.avatar }}
                      size={80}
                    />
                  ) : (
                    <Avatar.Icon
                      style={style.shadowRanking}
                      icon="account"
                      size={80}
                    />
                  )}
                  <Posicao>{terceiro.nome}</Posicao>
                  <Pontuacao>0</Pontuacao>
                </PosicaoAvatar>
              </ColocacaoContainer>
            </>
          )}
          <RankingContainer>
            {equipes.map(({ id, avatar, nome }, index) => (
              <Row key={id}>
                <Colocacao>
                  <Posicao>{index + 1}</Posicao>
                </Colocacao>
                <EquipeContainer
                  style={style.shadow}
                  onPress={() => navigation.navigate("Equipe", { id })}
                >
                  {avatar ? (
                    <Avatar.Image
                      style={style.avatarBg}
                      source={{ uri: avatar }}
                      size={50}
                    />
                  ) : (
                    <Avatar.Icon
                      style={style.avatarBg}
                      icon="account"
                      size={50}
                    />
                  )}
                  <Equipe>{nome}</Equipe>
                  <Pontuacao>0</Pontuacao>
                </EquipeContainer>
              </Row>
            ))}
          </RankingContainer>
        </>
      )}
    </Container>
  );
};

export default Ranking;
