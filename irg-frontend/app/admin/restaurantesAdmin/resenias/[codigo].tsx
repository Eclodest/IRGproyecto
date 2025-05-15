import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const mockReviews: Record<string, { title: string; description: string; date: string; }[]> = {
    astor2024: [
        { title: 'Excelente comida', description: 'Todo riquísimo, volveremos pronto.', date: '2024-05-01' },
        { title: 'Atención rápida', description: 'Muy buena atención al cliente.', date: '2024-04-28' },
        { title: 'Atención rápida', description: 'Muy buena atención al cliente.', date: '2024-04-28' },
        { title: 'Atención rápida', description: 'Muy buena atención al cliente.', date: '2024-04-28' },
        { title: 'Atención rápida', description: 'Muy buena atención al cliente.', date: '2024-04-28' },
        { title: 'Atención rápida', description: 'Muy buena atención al cliente.', date: '2024-04-28' },
        { title: 'Atención rápida', description: 'Muy buena atención al cliente.', date: '2024-04-28' },
        { title: 'Atención rápida', description: 'Muy buena atención al cliente.', date: '2024-04-28' },
        { title: 'Atención rápida', description: 'Muy buena atención al cliente.', date: '2024-04-28' },
    ],
    tacos2023: [
        { title: 'Tacos increíbles', description: 'Los mejores tacos que probé.', date: '2024-05-02' },
        { title: 'Ambiente genial', description: 'Muy buen ambiente para cenar.', date: '2024-04-27' },
    ]
};

export default function VerReseniasPage() {
    const { codigo } = useLocalSearchParams();
    const router = useRouter();
    const reviews = mockReviews[codigo as string] || [];

    if (reviews.length === 0) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>No hay reseñas disponibles para este restaurante.</Text>
                <TouchableOpacity onPress={() => router.replace(`/admin/restaurantesAdmin/eleccionResto?codigo=${codigo}`)} style={styles.backButton}>
                    <Text style={styles.backText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const sortedReviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => router.replace(`/admin/restaurantesAdmin/eleccionResto?codigo=${codigo}`)} style={styles.backButton}>
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Reseñas de {codigo}</Text>

            {sortedReviews.map((review, index) => (
                <View key={index} style={styles.reviewCard}>
                    <Text style={styles.reviewTitle}>{review.title}</Text>
                    <Text style={styles.reviewDescription}>{review.description}</Text>
                    <Text style={styles.reviewDate}>Fecha: {review.date}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f2ebdd', flexGrow: 1 },
    backButton: { marginBottom: 16, backgroundColor: '#6c1f2c', padding: 8, borderRadius: 5 },
    backText: { color: '#fff', textAlign: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    reviewCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
    reviewTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    reviewDescription: { fontSize: 14, marginBottom: 4 },
    reviewDate: { fontSize: 12, color: '#555' },
    notFoundContainer: { flex: 1, backgroundColor: '#f2ebdd', justifyContent: 'center', alignItems: 'center', padding: 20 },
    notFoundText: { fontSize: 18, marginBottom: 12, color: '#6c1f2c' },
});
