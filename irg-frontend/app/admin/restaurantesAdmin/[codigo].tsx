import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Header from '../../../components/Header';
import Ranking from '../../../components/Ranking';
import MenuCard from '../../../components/MenuCard';
import { restaurantsData } from '../../../constants/data';

export default function RestauranteAdminPage() {
    const { codigo } = useLocalSearchParams();
    const router = useRouter();

    const restaurant = restaurantsData[codigo as string];

    if (!restaurant) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Restaurante no encontrado</Text>
                <TouchableOpacity onPress={() => router.replace('/admin/escribirClave')} style={styles.backButton}>
                    <Text style={styles.backText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => router.replace(`../`)} style={styles.backButton}>
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>

            <Header restaurantName={restaurant.name} />
            <Ranking score={restaurant.ranking} />

            <Text style={styles.sectionTitle}>~ Gestión de Carta ~</Text>
            {restaurant.menu.map((item, index) => (
                <MenuCard key={index} title={`Editar ${item}`} onPress={() => { }} />
            ))}

            <Text style={styles.sectionTitle}>~ Reseñas del Restaurante ~</Text>
            <MenuCard title="Ver comentarios y calificaciones" onPress={() => { }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f2ebdd', flexGrow: 1 },
    sectionTitle: { backgroundColor: '#6c1f2c', color: '#fff', padding: 8, marginVertical: 10, fontSize: 16, fontWeight: 'bold', fontFamily: 'Playfair', textAlign: 'center' },
    notFoundContainer: { flex: 1, backgroundColor: '#f2ebdd', justifyContent: 'center', alignItems: 'center', padding: 20 },
    notFoundText: { fontSize: 18, marginBottom: 12, color: '#6c1f2c', fontFamily: 'Playfair' },
    backText: { fontSize: 16 },
    backButton: { position: 'absolute', top: 30, left: 25, zIndex: 1, backgroundColor: '#f2e3c4', padding: 6, borderWidth: 0.5, borderColor: '#000', borderRadius: 5 }
});
