import * as Clipboard from 'expo-clipboard';
import { Alert, Linking, Share } from 'react-native';

export const generateGoogleMapsUrl = (latitude: number, longitude: number): string => {
  return `https://maps.google.com/?q=${latitude},${longitude}`;
};

export const generateWazeUrl = (latitude: number, longitude: number): string => {
  return `https://waze.com/ul?ll=${latitude},${longitude}`;
};

export const generateWhatsAppMessage = (latitude: number, longitude: number): string => {
  const mapsUrl = generateGoogleMapsUrl(latitude, longitude);
  return `Minha localização: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}\nAbra no mapa: ${mapsUrl}`;
};

export const generateSMSMessage = (latitude: number, longitude: number): string => {
  const mapsUrl = generateGoogleMapsUrl(latitude, longitude);
  return `Minha localização: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} - ${mapsUrl}`;
};

export const generateEmailMessage = (latitude: number, longitude: number, accuracy?: number): { subject: string; body: string } => {
  const mapsUrl = generateGoogleMapsUrl(latitude, longitude);
  return {
    subject: 'Minha Localização - SOS Campo',
    body: `Latitude: ${latitude.toFixed(6)}\nLongitude: ${longitude.toFixed(6)}\nPrecisão: ${accuracy?.toFixed(2)}m\n\nAbra no mapa: ${mapsUrl}`,
  };
};

export const copyCoordinatesToClipboard = async (latitude: number, longitude: number): Promise<boolean> => {
  try {
    const text = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    await Clipboard.setStringAsync(text);
    return true;
  } catch (error) {
    console.error('Erro ao copiar:', error);
    return false;
  }
};

export const openGoogleMaps = (latitude: number, longitude: number) => {
  const url = generateGoogleMapsUrl(latitude, longitude);
  Linking.openURL(url).catch(() => {
    Alert.alert('Erro', 'Não foi possível abrir o Google Maps');
  });
};

export const openWaze = (latitude: number, longitude: number) => {
  const url = generateWazeUrl(latitude, longitude);
  Linking.openURL(url).catch(() => {
    Alert.alert('Erro', 'Waze não está instalado. Abrindo Google Maps...');
    openGoogleMaps(latitude, longitude);
  });
};

export const shareViaWhatsApp = async (latitude: number, longitude: number) => {
  try {
    const message = generateWhatsAppMessage(latitude, longitude);
    const waUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    
    const canOpen = await Linking.canOpenURL(waUrl);
    if (canOpen) {
      await Linking.openURL(waUrl);
    } else {
      Alert.alert('Erro', 'WhatsApp não está instalado');
    }
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível abrir WhatsApp');
  }
};

export const shareViaSMS = async (latitude: number, longitude: number) => {
  try {
    const message = generateSMSMessage(latitude, longitude);
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    
    await Linking.openURL(smsUrl);
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível abrir SMS');
  }
};

export const shareViaEmail = async (latitude: number, longitude: number, accuracy?: number) => {
  try {
    const { subject, body } = generateEmailMessage(latitude, longitude, accuracy);
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    await Linking.openURL(emailUrl);
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível abrir Email');
  }
};

export const nativeShare = async (latitude: number, longitude: number) => {
  try {
    const mapsUrl = generateGoogleMapsUrl(latitude, longitude);
    const message = `Minha localização: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    
    await Share.share({
      message,
      url: mapsUrl,
      title: 'Compartilhar Localização',
    });
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível compartilhar');
  }
};