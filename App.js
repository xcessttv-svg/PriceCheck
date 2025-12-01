import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SUPERMARKETS = [
  {
    name: 'Lidl',
    country: 'Spain',
    regions: [
      {
        name: 'Madrid',
        averageBasket: 47.8,
        qualityScore: 0.82,
        quantityScore: 0.78,
        offers: ['-10% fresh produce weekends', '2x1 organic yogurts'],
        coupons: ['€5 off €50 digital coupon'],
      },
      {
        name: 'Catalonia',
        averageBasket: 50.1,
        qualityScore: 0.8,
        quantityScore: 0.77,
        offers: ['Bakery loyalty stamp', 'Weekly frozen deal'],
        coupons: ['€3 off bakery pack'],
      },
    ],
  },
  {
    name: 'Aldi',
    country: 'Spain',
    regions: [
      {
        name: 'Andalucía (Sevilla)',
        averageBasket: 45.4,
        qualityScore: 0.79,
        quantityScore: 0.76,
        offers: ['Fresh fish Friday sale'],
        coupons: ['€6 off €60 until Sunday'],
      },
      {
        name: 'Madrid',
        averageBasket: 48.1,
        qualityScore: 0.81,
        quantityScore: 0.75,
        offers: ['-15% pantry essentials'],
        coupons: [],
      },
    ],
  },
  {
    name: 'Mercadona',
    country: 'Spain',
    regions: [
      {
        name: 'Valencia',
        averageBasket: 49.6,
        qualityScore: 0.85,
        quantityScore: 0.82,
        offers: ['Seasonal fruit box promo'],
        coupons: ['€4 off cleaning bundle'],
      },
      {
        name: 'Madrid',
        averageBasket: 50.9,
        qualityScore: 0.84,
        quantityScore: 0.81,
        offers: ['Ready-meal saver menu'],
        coupons: [],
      },
    ],
  },
  {
    name: 'Alcampo',
    country: 'Spain',
    regions: [
      {
        name: 'Catalonia',
        averageBasket: 52.3,
        qualityScore: 0.83,
        quantityScore: 0.85,
        offers: ['Fuel coupon with grocery basket'],
        coupons: ['€8 off €80 general basket'],
      },
      {
        name: 'Madrid',
        averageBasket: 51.2,
        qualityScore: 0.82,
        quantityScore: 0.83,
        offers: ['Electronics weekend bundle'],
        coupons: ['Household €3 off €30'],
      },
    ],
  },
  {
    name: 'El Corte Inglés',
    country: 'Spain',
    regions: [
      {
        name: 'Madrid',
        averageBasket: 58.9,
        qualityScore: 0.9,
        quantityScore: 0.88,
        offers: ['Club card points booster'],
        coupons: ['€10 off gourmet club'],
      },
      {
        name: 'Galicia (A Coruña)',
        averageBasket: 55.4,
        qualityScore: 0.88,
        quantityScore: 0.85,
        offers: ['Local seafood spotlight'],
        coupons: [],
      },
    ],
  },
  {
    name: 'Carrefour',
    country: 'Spain',
    regions: [
      {
        name: 'Catalonia',
        averageBasket: 50.5,
        qualityScore: 0.83,
        quantityScore: 0.8,
        offers: ['Carrefour+ loyalty prices'],
        coupons: ['€6 off €60 app coupon'],
      },
      {
        name: 'Valencia',
        averageBasket: 49.1,
        qualityScore: 0.82,
        quantityScore: 0.79,
        offers: ['Pet care month promo'],
        coupons: ['€5 off €45 home delivery'],
      },
    ],
  },
  {
    name: 'Día',
    country: 'Spain',
    regions: [
      {
        name: 'Madrid',
        averageBasket: 46.2,
        qualityScore: 0.74,
        quantityScore: 0.72,
        offers: ['App coupons rotating daily'],
        coupons: ['-5% loyalty card'],
      },
      {
        name: 'Andalucía (Granada)',
        averageBasket: 45.8,
        qualityScore: 0.73,
        quantityScore: 0.72,
        offers: ['Local produce spotlight'],
        coupons: [],
      },
    ],
  },
  {
    name: 'Costco',
    country: 'Spain',
    regions: [
      {
        name: 'Madrid',
        averageBasket: 60.4,
        qualityScore: 0.87,
        quantityScore: 0.92,
        offers: ['Membership instant savings'],
        coupons: ['Warehouse coupons via app'],
      },
      {
        name: 'Catalonia',
        averageBasket: 59.2,
        qualityScore: 0.86,
        quantityScore: 0.9,
        offers: ['Seasonal bulk bundles'],
        coupons: [],
      },
    ],
  },
  {
    name: 'Dani',
    country: 'Spain',
    regions: [
      {
        name: 'Andalucía (Granada)',
        averageBasket: 43.5,
        qualityScore: 0.72,
        quantityScore: 0.74,
        offers: ['Local growers highlight'],
        coupons: ['€3 off €35 midweek'],
      },
    ],
  },
  {
    name: 'Esclat',
    country: 'Spain',
    regions: [
      {
        name: 'Catalonia',
        averageBasket: 48.9,
        qualityScore: 0.82,
        quantityScore: 0.8,
        offers: ['Family pack discounts'],
        coupons: ['€2 off fruit and veg'],
      },
    ],
  },
  {
    name: 'Supermercados MAS',
    country: 'Spain',
    regions: [
      {
        name: 'Andalucía (Sevilla)',
        averageBasket: 44.2,
        qualityScore: 0.78,
        quantityScore: 0.76,
        offers: ['Fresh bread loyalty points'],
        coupons: ['€4 off €40 weekend coupon'],
      },
    ],
  },
  {
    name: 'Lidl',
    country: 'Portugal',
    regions: [
      {
        name: 'Lisbon',
        averageBasket: 42.1,
        qualityScore: 0.79,
        quantityScore: 0.76,
        offers: ['Fresh bakery €0.29 specials'],
        coupons: ['€3 off €30 app coupon'],
      },
    ],
  },
];

const postalToRegion = (postalCode) => {
  if (!postalCode) return null;
  const mapping = [
    { prefix: '28', region: 'Madrid' },
    { prefix: '08', region: 'Catalonia' },
    { prefix: '41', region: 'Andalucía (Sevilla)' },
    { prefix: '18', region: 'Andalucía (Granada)' },
    { prefix: '46', region: 'Valencia' },
    { prefix: '15', region: 'Galicia (A Coruña)' },
  ];
  const match = mapping.find((entry) => postalCode.startsWith(entry.prefix));
  return match ? match.region : null;
};

const ValueBadge = ({ label }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{label}</Text>
  </View>
);

export default function App() {
  const [country, setCountry] = useState('Spain');
  const [postalCode, setPostalCode] = useState('');
  const [manualRegion, setManualRegion] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    setLastUpdated(new Date());
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPostalCode('');
    setManualRegion(null);
  }, [country]);

  const regionFromPostal = useMemo(() => postalToRegion(postalCode), [postalCode]);
  const activeRegion = manualRegion || regionFromPostal;

  const countryChains = useMemo(
    () => SUPERMARKETS.filter((market) => market.country === country),
    [country],
  );

  const regionsInCountry = useMemo(() => {
    const regions = countryChains.flatMap((chain) => chain.regions.map((r) => r.name));
    return Array.from(new Set(regions));
  }, [countryChains]);

  const rankedByValue = useMemo(() => {
    const rankable = countryChains.map((chain) => {
      const regionData = activeRegion
        ? chain.regions.find((r) => r.name === activeRegion)
        : chain.regions[0];
      if (!regionData) return null;
      const valueScore = ((regionData.qualityScore + regionData.quantityScore) / 2) / (regionData.averageBasket / 50);
      return { ...chain, regionData, valueScore };
    });
    return rankable
      .filter(Boolean)
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 5);
  }, [countryChains, regionFromPostal]);

  const renderChain = (chain) => {
    const regionData = activeRegion
      ? chain.regions.find((r) => r.name === activeRegion) || chain.regions[0]
      : chain.regions[0];
    if (!regionData) return null;
    const priceLabel = `Average basket: €${regionData.averageBasket.toFixed(2)}`;
    const detailLabel = `Quality ${Math.round(regionData.qualityScore * 100)}% · Quantity ${Math.round(
      regionData.quantityScore * 100,
    )}%`;
    return (
      <View key={`${chain.name}-${regionData.name}`} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{chain.name}</Text>
          <ValueBadge label={regionData.name} />
        </View>
        <Text style={styles.cardSubtitle}>{priceLabel}</Text>
        <Text style={styles.cardDetail}>{detailLabel}</Text>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Offers</Text>
          <Text style={styles.sectionTitle}>Coupons</Text>
        </View>
        <View style={styles.sectionRow}>
          <View style={styles.listColumn}>
            {regionData.offers.map((offer) => (
              <Text key={`${chain.name}-${offer}`} style={styles.listItem}>
                • {offer}
              </Text>
            ))}
          </View>
          <View style={styles.listColumn}>
            {regionData.coupons.length ? (
              regionData.coupons.map((coupon) => (
                <Text key={`${chain.name}-${coupon}`} style={styles.listItem}>
                  • {coupon}
                </Text>
              ))
            ) : (
              <Text style={styles.listItem}>• No active coupons</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>PriceCheck · Supermarket comparison</Text>
        <Text style={styles.description}>
          Compare price, quality, quantity, and official offers across Spain's leading supermarket chains. Start with
          Spain and extend to more countries as data becomes available.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select country</Text>
          <View style={styles.pillRow}>
            {['Spain', 'Portugal'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.pill, country === option && styles.pillActive]}
                onPress={() => setCountry(option)}
              >
                <Text style={[styles.pillText, country === option && styles.pillTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.helper}>Add more countries by extending the dataset and update jobs.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Regional focus</Text>
          <Text style={styles.helper}>Enter a Spanish postal code or pick from the available regions.</Text>
          <TextInput
            style={styles.input}
            placeholder="Postal code (e.g. 28001)"
            keyboardType="numeric"
            value={postalCode}
            onChangeText={(value) => {
              setPostalCode(value);
              setManualRegion(null);
            }}
          />
          <View style={styles.pillRow}>
            {regionsInCountry.map((region) => (
              <TouchableOpacity
                key={region}
                style={[styles.pill, activeRegion === region && styles.pillActive]}
                onPress={() => {
                  setManualRegion(region);
                  setPostalCode('');
                }}
              >
                <Text style={[styles.pillText, activeRegion === region && styles.pillTextActive]}>{region}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.helper}>
            Matching region: {activeRegion || 'automatic detection once postal code is provided'}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Top value picks</Text>
            <Text style={styles.timestamp}>Updated {lastUpdated.toLocaleDateString()}</Text>
          </View>
          {rankedByValue.map((entry, index) => (
            <View key={`${entry.name}-${entry.regionData.name}`} style={styles.rankRow}>
              <ValueBadge label={`#${index + 1}`} />
              <View style={styles.rankContent}>
                <Text style={styles.rankTitle}>{entry.name}</Text>
                <Text style={styles.rankSubtitle}>
                  {entry.regionData.name} · Value score {entry.valueScore.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          {!rankedByValue.length && <Text style={styles.helper}>No data for this country yet.</Text>}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Detailed breakdown</Text>
          <Text style={styles.timestamp}>Daily auto-update enabled</Text>
        </View>
        {countryChains.map((chain) => renderChain(chain))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7fb',
  },
  container: {
    padding: 16,
    paddingBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1c2734',
  },
  description: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1c2734',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#2d3748',
    marginTop: 4,
  },
  cardDetail: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c2734',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
  },
  listColumn: {
    flex: 1,
  },
  listItem: {
    fontSize: 13,
    color: '#2d3748',
    marginVertical: 2,
  },
  badge: {
    backgroundColor: '#1e88e5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  pill: {
    borderWidth: 1,
    borderColor: '#cbd5e0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  pillActive: {
    backgroundColor: '#1e88e5',
    borderColor: '#1e88e5',
  },
  pillText: {
    color: '#1c2734',
    fontWeight: '700',
  },
  pillTextActive: {
    color: '#fff',
  },
  helper: {
    color: '#718096',
    fontSize: 13,
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    backgroundColor: '#fdfdfd',
    color: '#1c2734',
  },
  timestamp: {
    fontSize: 12,
    color: '#a0aec0',
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  rankContent: {
    marginLeft: 12,
  },
  rankTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c2734',
  },
  rankSubtitle: {
    fontSize: 13,
    color: '#4a5568',
  },
});
