import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const codigosValidos = ['astor2024', 'tacos2023'];

export default function EscribirClave() {
    const [codigo, setCodigo] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        const formatted = codigo.trim().toLowerCase();

        if (formatted.length !== 9) {
            Alert.alert('Código inválido', 'El código debe tener 9 caracteres.');
            return;
        }

        if (codigosValidos.includes(formatted)) {
            router.push({ pathname: '/admin/restaurantesAdmin/eleccionResto', params: { codigo: formatted } });
        } else {
            Alert.alert('Código incorrecto', 'No se encontró ningún restaurante con ese código.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Ingresá el código de tu restaurante</Text>
            <TextInput
                value={codigo}
                onChangeText={setCodigo}
                placeholder="Ej: astor2024"
                style={styles.input}
                autoCapitalize="none"
                maxLength={9}
            />
            <Button title="Entrar" onPress={handleSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f2ebdd' },
    title: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
    logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 20 },
    backText: { fontSize: 16 },
    backButton: { position: 'absolute', top: 30, left: 25, zIndex: 1, backgroundColor: '#f2e3c4', padding: 6, borderWidth: 0.5, borderColor: '#000', borderRadius: 5 }
});
