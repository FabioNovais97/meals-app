import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function TelaDetalhes({ route }) {
  const { receita } = route.params;

  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ingrediente = receita['strIngredient' + i];
    const medida = receita['strMeasure' + i];
    if (ingrediente && ingrediente.trim() !== '') {
      ingredientes.push(medida + ' ' + ingrediente);
    }
  }

  return (
    <ScrollView style={estilos.container}>
      <Image source={{ uri: receita.strMealThumb }} style={estilos.imagem} />

      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>{receita.strMeal}</Text>
        <Text style={estilos.info}>Categoria: {receita.strCategory}</Text>
        <Text style={estilos.info}>Origem: {receita.strArea}</Text>

        <Text style={estilos.subtitulo}>Ingredientes</Text>
        {ingredientes.map((item, indice) => (
          <Text key={indice} style={estilos.texto}>
            - {item}
          </Text>
        ))}

        <Text style={estilos.subtitulo}>Modo de preparo</Text>
        <Text style={estilos.texto}>{receita.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagem: {
    width: '100%',
    height: 250,
  },
  conteudo: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
});
