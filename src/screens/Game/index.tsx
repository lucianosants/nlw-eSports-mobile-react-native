import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

import logoImage from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { THEME } from '../../theme';

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;

    const handleBack = () => {
        navigation.goBack();
    };

    const getDiscordUser = async (adsId: string) => {
        fetch(`http://192.168.0.101:3333/ads/${adsId}/discord`)
            .then(response => response.json())
            .then(data => {
                setDiscordDuoSelected(data.discord)
            });
    };

    useEffect(() => {
        fetch(`http://192.168.0.101:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDuos(data));
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={logoImage}
                        style={styles.logo}
                    />

                    <View style={styles.right} />

                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.banner}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle='Conecte-se e comece a jogar!'
                />

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard
                            data={item}
                            onConnect={() => getDiscordUser(item.id)}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyList}>
                            Ainda não há anúncios publicados para este jogo.
                        </Text>
                    )}
                />

                <DuoMatch
                    onClose={() => setDiscordDuoSelected('')}
                    visible={discordDuoSelected.length > 0}
                    discord={discordDuoSelected}
                />
            </SafeAreaView>
        </Background>
    );
}