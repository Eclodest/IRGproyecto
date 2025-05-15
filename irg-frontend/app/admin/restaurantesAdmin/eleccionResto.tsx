import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EleccionRubroAdmin() {
    const router = useRouter();
    const { codigo } = useLocalSearchParams();

    const navigateToGestion = () => {
        router.push(`/admin/restaurantesAdmin/${codigo}`);
    };

    const navigateToResenias = () => {
        router.push(`/admin/restaurantesAdmin/resenias/${codigo}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>LOGO</Text>
            </View>
            <Text style={styles.title}>GESTIONAR</Text>
            <Text style={styles.title}>NEGOCIO</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={navigateToGestion}>
                    <Text style={styles.buttonText}>Gestionar Carta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={navigateToResenias}>
                    <Text style={styles.buttonText}>Ver Reseñas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2ebdd', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
    logoContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
    logoText: { fontSize: 12, color: '#000' },
    title: { fontSize: 32, fontFamily: 'Playfair', color: '#000', textAlign: 'center' },
    buttonsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
    button: { backgroundColor: '#6c1f2c', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, margin: 5 },
    buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
