import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SeleccionUser() {
    const router = useRouter();

    const handleCliente = () => {
        router.replace('/cliente/register');
    };

    const handleRestaurante = () => {
        router.push('/admin/escribirClave');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cata Oculta</Text>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.subtitle}>¿Cómo querés ingresar?</Text>
            <View style={styles.buttonContainer}>
                <Button title="Cliente" onPress={handleCliente} />
                <Button title="Restaurante" onPress={handleRestaurante} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2ebdd',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    subtitle: {
        fontSize: 20,
        marginVertical: 30,
        textAlign: 'center',
        fontFamily: 'Playfair',
        color: '#6c1f2c',
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Playfair',
        color: '#6c1f2c',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30
    }
});
