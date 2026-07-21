import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';

export default function App() {
  const [appMode, setAppMode] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');
  
  const [inventory, setInventory] = useState([
    { id: '1', name: 'Κρέας Μοσχάρι', category: 'Κρέατα', status: 'Open', expiryDays: 2, quantity: '5kg' },
    { id: '2', name: 'Γάλα Φρέσκο', category: 'Γαλακτοκομικά', status: 'New', expiryDays: 5, quantity: '10lt' },
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: '1', name: 'Κρεοπωλείο "Ο Καλός"', email: 'meat@supplier.gr', phone: '6911111111' }
  ]);
  const [newSupName, setNewSupName] = useState('');
  const [newSupEmail, setNewSupEmail] = useState('');

  if (!appMode) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.gatewayContainer}>
          <Text style={styles.title}>ZeroWastePro</Text>
          <Text style={styles.subtitle}>Επιλέξτε τρόπο λειτουργίας</Text>

          <TouchableOpacity style={styles.modeButtonHome} onPress={() => setAppMode('home')}>
            <Text style={styles.modeButtonText}>🏠 Home Mode (Νοικοκυριά)</Text>
            <Text style={styles.modeSubText}>Έλεγχος ψυγείου & Συνταγές μηδενικής σπατάλης</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modeButtonPro} onPress={() => setAppMode('pro')}>
            <Text style={styles.modeButtonText}>💼 Professional Mode (B2B)</Text>
            <Text style={styles.modeSubText}>FIFO, Προμηθευτές, Έλεγχος Φύρας & Παραγγελίες</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const addSupplier = () => {
    if (!newSupName || !newSupEmail) {
      Alert.alert('Σφάλμα', 'Συμπληρώστε όνομα και email προμηθευτή.');
      return;
    }
    setSuppliers([...suppliers, { id: Date.now().toString(), name: newSupName, email: newSupEmail }]);
    setNewSupName('');
    setNewSupEmail('');
    Alert.alert('Επιτυχία', 'Ο προμηθευτής αποθηκεύτηκε δυναμικά!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {appMode === 'pro' ? '💼 Pro Mode - Επιχείρηση' : '🏠 Home Mode - Νοικοκυριό'}
        </Text>
        <TouchableOpacity onPress={() => setAppMode(null)}>
          <Text style={styles.switchText}>[Αλλαγή]</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, activeTab === 'inventory' && styles.activeTab]} onPress={() => setActiveTab('inventory')}>
          <Text style={styles.tabText}>Αποθήκη / FIFO</Text>
        </TouchableOpacity>
        {appMode === 'pro' && (
          <TouchableOpacity style={[styles.tab, activeTab === 'suppliers' && styles.activeTab]} onPress={() => setActiveTab('suppliers')}>
            <Text style={styles.tabText}>Προμηθευτές</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.tab, activeTab === 'ai_hub' && styles.activeTab]} onPress={() => setActiveTab('ai_hub')}>
          <Text style={styles.tabText}>{appMode === 'pro' ? 'AI Advisor' : 'Συνταγές AI'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'inventory' && (
          <View>
            <Text style={styles.sectionTitle}>Τρέχον Απόθεμα (FIFO Protocol)</Text>
            {inventory.map((item) => (
              <View key={item.id} style={styles.card}>
                <View>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemDetails}>Ποσότητα: {item.quantity} | Κατηγορία: {item.category}</Text>
                  <Text style={[styles.badge, item.status === 'Open' ? styles.badgeOpen : styles.badgeNew]}>
                    Κατάσταση: {item.status} ({item.expiryDays} μέρες λήξη)
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'suppliers' && appMode === 'pro' && (
          <View>
            <Text style={styles.sectionTitle}>Διαχείριση Προμηθευτών (Plug & Play)</Text>
            <View style={styles.formCard}>
              <TextInput 
                style={styles.input} 
                placeholder="Όνομα Προμηθευτή" 
                placeholderTextColor="#888"
                value={newSupName} 
                onChangeText={setNewSupName} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Email Προμηθευτή" 
                placeholderTextColor="#888"
                value={newSupEmail} 
                onChangeText={setNewSupEmail} 
              />
              <TouchableOpacity style={styles.actionButton} onPress={addSupplier}>
                <Text style={styles.actionButtonText}>+ Προσθήκη Προμηθευτή</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subSectionTitle}>Αποθηκευμένοι Προμηθευτές</Text>
            {suppliers.map((sup) => (
              <View key={sup.id} style={styles.card}>
                <Text style={styles.itemTitle}>{sup.name}</Text>
                <Text style={styles.itemDetails}>Email: {sup.email}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'ai_hub' && (
          <View>
            <Text style={styles.sectionTitle}>
              {appMode === 'pro' ? 'Zero-Waste Profit Advisor' : 'AI Chef (Συνταγές Ψυγείου)'}
            </Text>
            <View style={styles.card}>
              {appMode === 'pro' ? (
                <Text style={styles.itemDetails}>
                  💡 Σύσταση AI: Το προϊόν «Κρέας Μοσχάρι» κλείνει 2 μέρες ανοιχτό. Προτείνεται άμεση αξιοποίηση.
                </Text>
              ) : (
                <Text style={styles.itemDetails}>
                  🍳 Προτεινόμενη Συνταγή: Φτιάξτε κρεατόσουπα βελουτέ με τα υλικά που λήγουν!
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  gatewayContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#00E676', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#AAA', marginBottom: 40, textAlign: 'center' },
  modeButtonHome: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12, width: '100%', marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  modeButtonPro: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12, width: '100%', borderWidth: 1, borderColor: '#00E676' },
  modeButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  modeSubText: { color: '#888', fontSize: 13 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#1E1E1E' },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  switchText: { color: '#00E676', fontSize: 14 },
  tabBar: { flexDirection: 'row', backgroundColor: '#181818', borderBottomWidth: 1, borderBottomColor: '#222' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#00E676' },
  tabText: { color: '#CCC', fontSize: 12, fontWeight: 'bold' },
  content: { padding: 15 },
  sectionTitle: { color: '#00E676', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  subSectionTitle: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  card: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#2A2A2A' },
  itemTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  itemDetails: { color: '#AAA', fontSize: 13 },
  badge: { marginTop: 6, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontSize: 11, fontWeight: 'bold' },
  badgeNew: { backgroundColor: '#003311', color: '#00E676' },
  badgeOpen: { backgroundColor: '#331100', color: '#FF9100' },
  formCard: { backgroundColor: '#1A1A1A', padding: 12, borderRadius: 8, marginBottom: 10 },
  input: { backgroundColor: '#262626', color: '#FFF', padding: 10, borderRadius: 6, marginBottom: 10, fontSize: 13 },
  actionButton: { backgroundColor: '#00E676', padding: 12, borderRadius: 6, alignItems: 'center' },
  actionButtonText: { color: '#121212', fontWeight: 'bold', fontSize: 13 }
});
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';

export default function App() {
  const [appMode, setAppMode] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');
  
  const [inventory, setInventory] = useState([
    { id: '1', name: 'Κρέας Μοσχάρι', category: 'Κρέατα', status: 'Open', expiryDays: 2, quantity: '5kg' },
    { id: '2', name: 'Γάλα Φρέσκο', category: 'Γαλακτοκομικά', status: 'New', expiryDays: 5, quantity: '10lt' },
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: '1', name: 'Κρεοπωλείο "Ο Καλός"', email: 'meat@supplier.gr', phone: '6911111111' }
  ]);
  const [newSupName, setNewSupName] = useState('');
  const [newSupEmail, setNewSupEmail] = useState('');

  if (!appMode) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.gatewayContainer}>
          <Text style={styles.title}>ZeroWastePro</Text>
          <Text style={styles.subtitle}>Επιλέξτε τρόπο λειτουργίας</Text>

          <TouchableOpacity style={styles.modeButtonHome} onPress={() => setAppMode('home')}>
            <Text style={styles.modeButtonText}>🏠 Home Mode (Νοικοκυριά)</Text>
            <Text style={styles.modeSubText}>Έλεγχος ψυγείου & Συνταγές μηδενικής σπατάλης</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modeButtonPro} onPress={() => setAppMode('pro')}>
            <Text style={styles.modeButtonText}>💼 Professional Mode (B2B)</Text>
            <Text style={styles.modeSubText}>FIFO, Προμηθευτές, Έλεγχος Φύρας & Παραγγελίες</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const addSupplier = () => {
    if (!newSupName || !newSupEmail) {
      Alert.alert('Σφάλμα', 'Συμπληρώστε όνομα και email προμηθευτή.');
      return;
    }
    setSuppliers([...suppliers, { id: Date.now().toString(), name: newSupName, email: newSupEmail }]);
    setNewSupName('');
    setNewSupEmail('');
    Alert.alert('Επιτυχία', 'Ο προμηθευτής αποθηκεύτηκε δυναμικά!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {appMode === 'pro' ? '💼 Pro Mode - Επιχείρηση' : '🏠 Home Mode - Νοικοκυριό'}
        </Text>
        <TouchableOpacity onPress={() => setAppMode(null)}>
          <Text style={styles.switchText}>[Αλλαγή]</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, activeTab === 'inventory' && styles.activeTab]} onPress={() => setActiveTab('inventory')}>
          <Text style={styles.tabText}>Αποθήκη / FIFO</Text>
        </TouchableOpacity>
        {appMode === 'pro' && (
          <TouchableOpacity style={[styles.tab, activeTab === 'suppliers' && styles.activeTab]} onPress={() => setActiveTab('suppliers')}>
            <Text style={styles.tabText}>Προμηθευτές</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.tab, activeTab === 'ai_hub' && styles.activeTab]} onPress={() => setActiveTab('ai_hub')}>
          <Text style={styles.tabText}>{appMode === 'pro' ? 'AI Advisor' : 'Συνταγές AI'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'inventory' && (
          <View>
            <Text style={styles.sectionTitle}>Τρέχον Απόθεμα (FIFO Protocol)</Text>
            {inventory.map((item) => (
              <View key={item.id} style={styles.card}>
                <View>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemDetails}>Ποσότητα: {item.quantity} | Κατηγορία: {item.category}</Text>
                  <Text style={[styles.badge, item.status === 'Open' ? styles.badgeOpen : styles.badgeNew]}>
                    Κατάσταση: {item.status} ({item.expiryDays} μέρες λήξη)
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'suppliers' && appMode === 'pro' && (
          <View>
            <Text style={styles.sectionTitle}>Διαχείριση Προμηθευτών (Plug & Play)</Text>
            <View style={styles.formCard}>
              <TextInput 
                style={styles.input} 
                placeholder="Όνομα Προμηθευτή" 
                placeholderTextColor="#888"
                value={newSupName} 
                onChangeText={setNewSupName} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Email Προμηθευτή" 
                placeholderTextColor="#888"
                value={newSupEmail} 
                onChangeText={setNewSupEmail} 
              />
              <TouchableOpacity style={styles.actionButton} onPress={addSupplier}>
                <Text style={styles.actionButtonText}>+ Προσθήκη Προμηθευτή</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subSectionTitle}>Αποθηκευμένοι Προμηθευτές</Text>
            {suppliers.map((sup) => (
              <View key={sup.id} style={styles.card}>
                <Text style={styles.itemTitle}>{sup.name}</Text>
                <Text style={styles.itemDetails}>Email: {sup.email}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'ai_hub' && (
          <View>
            <Text style={styles.sectionTitle}>
              {appMode === 'pro' ? 'Zero-Waste Profit Advisor' : 'AI Chef (Συνταγές Ψυγείου)'}
            </Text>
            <View style={styles.card}>
              {appMode === 'pro' ? (
                <Text style={styles.itemDetails}>
                  💡 Σύσταση AI: Το προϊόν «Κρέας Μοσχάρι» κλείνει 2 μέρες ανοιχτό. Προτείνεται άμεση αξιοποίηση.
                </Text>
              ) : (
                <Text style={styles.itemDetails}>
                  🍳 Προτεινόμενη Συνταγή: Φτιάξτε κρεατόσουπα βελουτέ με τα υλικά που λήγουν!
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  gatewayContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#00E676', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#AAA', marginBottom: 40, textAlign: 'center' },
  modeButtonHome: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12, width: '100%', marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  modeButtonPro: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12, width: '100%', borderWidth: 1, borderColor: '#00E676' },
  modeButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  modeSubText: { color: '#888', fontSize: 13 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#1E1E1E' },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  switchText: { color: '#00E676', fontSize: 14 },
  tabBar: { flexDirection: 'row', backgroundColor: '#181818', borderBottomWidth: 1, borderBottomColor: '#222' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#00E676' },
  tabText: { color: '#CCC', fontSize: 12, fontWeight: 'bold' },
  content: { padding: 15 },
  sectionTitle: { color: '#00E676', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  subSectionTitle: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  card: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#2A2A2A' },
  itemTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  itemDetails: { color: '#AAA', fontSize: 13 },
  badge: { marginTop: 6, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontSize: 11, fontWeight: 'bold' },
  badgeNew: { backgroundColor: '#003311', color: '#00E676' },
  badgeOpen: { backgroundColor: '#331100', color: '#FF9100' },
  formCard: { backgroundColor: '#1A1A1A', padding: 12, borderRadius: 8, marginBottom: 10 },
  input: { backgroundColor: '#262626', color: '#FFF', padding: 10, borderRadius: 6, marginBottom: 10, fontSize: 13 },
  actionButton: { backgroundColor: '#00E676', padding: 12, borderRadius: 6, alignItems: 'center' },
  actionButtonText: { color: '#121212', fontWeight: 'bold', fontSize: 13 }
});

