import { useLocalSearchParams, useRouter } from 'expo-router'
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Alert,
    TouchableOpacity
} from 'react-native'
import { useState } from 'react'
import { restaurantAliases } from '../../../constants/data'
import { useRestaurantes } from '../../../contexts/RestoContext'
import { Check, Trash2, Star, ArrowLeft } from 'lucide-react-native'

const categorias = ['Entrantes', 'Primeros', 'Segundos', 'Postres', 'Bebidas']
const opcionesSub = ['Frio', 'Caliente']

export default function EditarPlato() {
    const { codigo, index } = useLocalSearchParams()
    const router = useRouter()

    const alias = restaurantAliases[codigo as string]
    const { restaurantes, actualizarPlato, eliminarPlato } = useRestaurantes()

    const restaurante = alias ? restaurantes?.[alias] : undefined
    const platoIndex = parseInt(index as string)

    if (!alias || !restaurante || !restaurante.platos[platoIndex]) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2ebdd' }}>
                <Text style={{ color: '#6c1f2c', fontSize: 16, fontFamily: 'Playfair' }}>
                    Plato no encontrado.
                </Text>
            </View>
        )
    }

    const item = restaurante.platos[platoIndex]

    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [category, setCategory] = useState(item.category)
    const [subCategory, setSubCategory] = useState(item.subCategory || '')

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert('Error', 'El nombre del plato no puede estar vacío.')
            return
        }
        if (!description.trim()) {
            Alert.alert('Error', 'La descripción no puede estar vacía.')
            return
        }
        if (!subCategory.trim()) {
            Alert.alert('Error', 'Seleccioná una categoría secundaria.')
            return
        }

        actualizarPlato(alias, platoIndex, {
            name,
            description,
            image: item.image,
            category,
            subCategory
        })

        Alert.alert('Éxito', 'Los cambios fueron guardados correctamente.', [
            { text: 'OK', onPress: () => router.back() }
        ])
    }

    const handleDelete = () => {
        Alert.alert(
            'Eliminar Plato',
            '¿Estás seguro de que querés eliminar este plato?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        eliminarPlato(alias, platoIndex)
                        router.back()
                    }
                }
            ]
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={30} color="#000" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Editar Plato</Text>

                <Text style={styles.label}>Nombre del Plato</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => {
                        if (text.length <= 50) setName(text)
                    }}
                    maxLength={50}
                    placeholder="Máx. 50 caracteres"
                />

                <View style={styles.imageWrapper}>
                    {item.image && (
                        <>
                            <Image
                                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                                style={styles.preview}
                            />
                            <Text style={styles.scoreText}>
                                <Star size={16} color="#f1c40f" />{' '}
                                {typeof item.score === 'number'
                                    ? `${item.score.toFixed(2)} / 5`
                                    : 'Sin puntuación aún'}
                            </Text>
                        </>
                    )}
                </View>

                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={(text) => {
                        if (text.length <= 111) setDescription(text)
                    }}
                    multiline
                    maxLength={111}
                    placeholder="Máx. 111 caracteres"
                />

                <Text style={styles.label}>Categoría Principal</Text>
                <View style={styles.dropdownCentered}>
                    {categorias.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryButton,
                                category === cat && styles.categoryButtonSelected
                            ]}
                            onPress={() => setCategory(cat)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    category === cat && styles.categoryTextSelected
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Categoría Secundaria</Text>
                <View style={styles.dropdownWrapper}>
                    {opcionesSub.map((sub) => (
                        <TouchableOpacity
                            key={sub}
                            style={[
                                styles.categoryButton,
                                subCategory === sub && styles.categoryButtonSelected
                            ]}
                            onPress={() => setSubCategory(sub)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    subCategory === sub && styles.categoryTextSelected
                                ]}
                            >
                                {sub}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Check size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Guardar Cambios</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Trash2 size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Eliminar Plato</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f2ebdd',
        alignItems: 'center',
        padding: 24
    },
    headerWrapper: {
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#f2ebdd',
        zIndex: 30
    },
    backButton: {
        padding: 4,
        marginBottom: 0,
        alignSelf: 'flex-start'
    },
    title: {
        fontSize: 26,
        fontFamily: 'Playfair',
        color: '#000',
        marginBottom: 20
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Playfair',
        color: '#6c1f2c',
        marginTop: 12,
        marginBottom: 4
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top'
    },
    imageWrapper: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 16
    },
    preview: {
        width: 160,
        height: 160,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    dropdownWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 4
    },
    dropdownCentered: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        marginTop: 4
    },
    categoryButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#6c1f2c',
        backgroundColor: '#fff',
        marginRight: 8,
        marginTop: 6
    },
    categoryButtonSelected: {
        backgroundColor: '#6c1f2c'
    },
    categoryText: {
        fontFamily: 'Playfair',
        color: '#6c1f2c'
    },
    categoryTextSelected: {
        color: '#fff'
    },
    scoreText: {
        fontSize: 16,
        fontFamily: 'Playfair',
        color: '#000',
        marginTop: 8,
        textAlign: 'center'
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#2e7d32',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4
    },
    deleteButton: {
        flexDirection: 'row',
        backgroundColor: '#8B0000',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4
    },
    buttonText: {
        color: '#fff',
        fontSize: 16.5
    }
})