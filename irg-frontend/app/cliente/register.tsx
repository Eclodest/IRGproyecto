import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    cluster: 'Madrid',
    terminos: false,
  });

  const isValid = () => {
    const { nombre, apellidos, telefono, terminos } = formData;

    if (!nombre.trim() && !apellidos.trim() && !telefono.trim()) {
      Alert.alert('Error', 'Por favor ingrese los datos solicitados.');
      return false;
    }

    if (nombre.trim().length <= 2) {
      Alert.alert('Error', 'El nombre debe tener al menos 3 caracteres.');
      return false;
    }

    if (apellidos.trim().length <= 2) {
      Alert.alert('Error', 'El apellido debe tener al menos 3 caracteres.');
      return false;
    }

    if (!/^[0-9]{9}$/.test(telefono)) {
      Alert.alert('Error', 'El teléfono debe tener exactamente 9 dígitos numéricos.');
      return false;
    }

    if (!terminos) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (isValid()) {
      router.replace('/cliente/restoBuscador');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.title}>REGISTRATE</Text>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Cata oculta</Text>
          <Text style={styles.counterNumber}>HOLAAAA</Text>
        </View>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduzca su nombre"
          value={formData.nombre}
          onChangeText={(text) => setFormData({ ...formData, nombre: text })}
        />

        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduzca sus apellidos"
          value={formData.apellidos}
          onChangeText={(text) => setFormData({ ...formData, apellidos: text })}
        />

        <Text style={styles.label}>Teléfono</Text>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.prefix}>+34</Text>
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder="número de teléfono"
            keyboardType="number-pad"
            maxLength={9}
            value={formData.telefono}
            onChangeText={(text) => setFormData({ ...formData, telefono: text.replace(/[^0-9]/g, '') })}
          />
        </View>

        <Text style={styles.label}>Comunidad</Text>
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>Madrid</Text>
          <TouchableOpacity style={styles.clusterButton} onPress={handleSubmit}>
            <Text style={styles.clusterButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setFormData({ ...formData, terminos: !formData.terminos })}
          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderWidth: 1,
              borderColor: '#5C5C5C',
              borderRadius: 6,
              marginRight: 10,
              backgroundColor: formData.terminos ? '#007AFF' : '#FFF',
            }}
          />
          <Text style={styles.checkboxText}>
            BLA BLA BLA HE LEÍDO Y ACEPTADO LOS TÉRMINOS QUE NO SE QUE QUE NO SE CUANTOS
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5E9E2',
    padding: 20,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#5C5C5C',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    marginRight: 8,
    fontSize: 16,
    color: '#5C5C5C',
    fontFamily: 'Inter_600SemiBold',
  },
  phoneInput: {
    flex: 1,
  },
  clusterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  clusterText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#000',
  },
  clusterButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  clusterButtonText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  checkboxText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#5C5C5C',
  },
  counterContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c1f2c',
    fontFamily: 'Playfair',
    marginBottom: 4,
  },
  counterNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#729c8c',
    fontFamily: 'Playfair',
  },
  backText: {
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 25,
    zIndex: 1,
    backgroundColor: '#f7e6c3',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
  },
  formContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 50,
  },
});