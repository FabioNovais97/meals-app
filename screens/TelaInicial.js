import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default function TelaInicial({ navigation }) {
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    buscarReceitas();
  }, []);

  async function buscarReceitas() {
    try {
      const resposta = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
      );
      setReceitas(resposta.data.meals);
    } catch (e) {
      console.log(e);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  function abrirDetalhes(receita) {
    navigation.navigate('Detalhes', { receita: receita });
  }

  function mostrarReceita({ item }) {
    return (
      <TouchableOpacity style={estilos.card} onPress={() => abrirDetalhes(item)}>
        <Image source={{ uri: item.strMealThumb }} style={estilos.imagem} />
        <Text style={estilos.nome}>{item.strMeal}</Text>
      </TouchableOpacity>
    );
  }

  if (carregando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" />
        <Text style={estilos.mensagem}>Carregando receitas...</Text>
      </View>
    );
  }

  if (erro || !receitas) {
    return (
      <View style={estilos.centro}>
        <Text style={estilos.mensagem}>Nao foi possivel carregar as receitas.</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.idMeal}
        renderItem={mostrarReceita}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  mensagem: {
    marginTop: 10,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: 180,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});
