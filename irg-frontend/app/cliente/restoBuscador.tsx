import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { restaurantsData } from '../../constants/data';

export default function Index() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        const formattedId = search.trim().toLowerCase().replace(/\s+/g, '-');
        if (restaurantsData[formattedId]) {
            router.push(`./restaurantes/${formattedId}`);
        } else {
            Alert.alert('Restaurante no encontrado');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>¿En qué restaurante estás?</Text>
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Ej: Astor, El Rey de los Tacos"
                style={styles.input}
            />
            <Button title="Buscar" onPress={handleSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
        backgroundColor: "#f2ebdd"
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    logo: {
        width: 100,
        height: 100,
    }
});
