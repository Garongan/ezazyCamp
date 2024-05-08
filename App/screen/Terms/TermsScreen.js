import React, { useCallback } from "react";
import { Button, Linking, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../shared/constant/typography";
import { ScrollView } from "react-native-gesture-handler";

const TermsScreen = () => {
    const { theme } = useTheme();
    const supportUrl = "support@eazycamp.com";
    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return <Button title={children} onPress={handlePress} />;
    };
    return (
        <ScrollView
            style={[
                {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                },
                theme.padding,
            ]}
        >
            <Text style={[{ color: theme.colors.text, marginBottom: 20 }, typography.header]}>Terms and Condition</Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Selamat datang di aplikasi EazyCamp! Syarat dan Ketentuan ini dibuat untuk Customer kami.
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Harap baca dengan seksama syarat dan ketentuan ini sebelum menggunakan aplikasi kami. dengan mengakses
                atau menggunakan aplikasi ini, anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika anda
                tidak setuju dengan syarat dan ketentuan ini, anda tidak diizinkan untuk menggunakan aplikasi ini.
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 20 }, typography.title]}>
                Penerima syarat dan ketentuan
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Dengan menggunakan aplikasi ini, anda menyatakan bahwa anda telah membaca, memahami, dan menyetujui
                untuk terikat oleh dan ketentuan ini.
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 20 }, typography.title]}>Layanan Aplikasi</Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Aplikasi ini menyediakan fitur pemesanan/persewaan peralatan dan/atau perlengkapan camping sekaligus
                menyediakan tambahan yaitu anda bisa memilih tambahan pemandu. dengan adanya pemandu akan sangat
                membantu dalam perjalanan maupun ditempat.
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 20 }, typography.title]}>Akun Pengguna</Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Beberapa fitur aplikasi disini mungkin memerlukan anda untuk membuat akun pengguna terlebih dahulu
                sebelum mengakses fitur lebih dalam. Anda Bertanggung jawab untuk menjaga keamanan informasi akun anda
                dan tidak mengungkapkan kredential akun anda kepada pihak lain.
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 20 }, typography.title]}>
                Penggunaan yang Dilarang
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Dilarang keras untuk menggunakan aplikasi ini untuk tujuan ilegal atau melanggar hak pihak lain. Segala
                bentuk perilaku yang tidak etis atau melanggar hukum akan mengakibatkan penghentian akses anda ke
                aplikasi.
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 20 }, typography.title]}>Privasi Pengguna</Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Kami menghormati privasi pengguna kami dan mengumpulkan, menggunakan, dan melindungi data pengguna
                sesuai dengan kebijakan privasi kami. Dengan menggunakan aplikasi ini, anda menyetujui pengumpulan,
                penggunaan, dan perlindungan data anda sesuai dengan kebijakan privasi kami.
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 20 }, typography.title]}>
                Pembaruan dan Perubahan
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Kami berhak untuk memperbarui, mengubah, atau mengubah syarat dan ketentuan ini sesuai kebijakan kami
                tanpa pemberitahuan sebelumnya. Perubahan tersebut akan efektif segera setelah diberlakukan. Dengan
                melanjutkan penggunaan aplikasi setelah perubahan tersebut, anda menyetujui syarat dan ketentuan yang
                diperbarui.
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 20 }, typography.title]}>Penutupan Akun</Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Kami Berhak untuk menutup akun pengguna jika kami menemukan pelanggaran terhadap syarat dan ketentuan
                ini atau perilaku yang melanggar hukum dan etika.
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 20 }, typography.title]}>Kontak</Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Jika anda memiliki pertanyaan tentang syarat dan ketentuan ini atau ingin melaporkan pelanggaran,
                silahkan hubungi kami di{" "}
                <OpenURLButton url={`mailto:${supportUrl}`}>support@eazycamp.com</OpenURLButton>
            </Text>
            <Text style={[{ color: theme.colors.text, marginBottom: 10 }, typography.body]}>
                Dengan menggunakan aplikasi ini, anda menyatakan bahwa anda telah membaca, memahami, dan menyetujui
                syarat dan ketentuan ini. Jika anda tidak setuju dengan syarat dan ketentuan ini, anda tidak diizinkan
                untuk menggunakan aplikasi ini.
            </Text>
        </ScrollView>
    );
};

export default TermsScreen;
