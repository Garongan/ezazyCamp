import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Appearance, Modal, Pressable, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import CustomHeader from "../../shared/components/CustomHeader";
import { borders } from "../../shared/constant/borders";
import useCustomerService from "../../service/useCustomerService";
import { CommonActions } from "@react-navigation/native";
import useLocalStorage from "../../utils/useLocalStorage";

const EditProfileScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const localStorage = useLocalStorage();
    const { id, name, phone, username } = route.params;
    const [changeWhat, setChangeWhat] = useState("");
    const [valueName, setValueName] = useState(name);
    const [valuePhone, setValuePhone] = useState(phone);
    const [modalVisible, setModalVisible] = useState(false);
    const bg = Appearance.getColorScheme() === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
    const service = useCustomerService();

    const handleSave = async () => {
        try {
            const savedData = { id: id, name: valueName, phone: valuePhone, username: username };
            const response = await service.updateById(savedData);
            if (response.statusCode === 200) {
                await localStorage.setData("user", savedData);
                navigation.dispatch(CommonActions.goBack());
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    return (
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            {/* modal */}
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}>
                    <View
                        style={[
                            { height: "auto", backgroundColor: theme.colors.background, paddingTop: 20 },
                            theme.padding,
                        ]}
                    >
                        <View style={{ marginBottom: 10 }}>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                style={{ position: "absolute", right: 0, top: 0 }}
                            >
                                <Ionicons name="close-circle-outline" size={24} color={theme.colors.text} />
                            </Pressable>
                            <Text style={{ color: theme.colors.text, marginTop: 20 }}>{changeWhat}</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderWidth: borders.borderWidth,
                                    borderColor: theme.colors.text,
                                    borderRadius: borders.radiusMedium,
                                    marginVertical: 8,
                                    width: "100%",
                                }}
                            >
                                <AntDesign
                                    name="edit"
                                    size={24}
                                    color={theme.colors.text}
                                    style={{ marginHorizontal: 10 }}
                                />
                                <TextInput
                                    autoFocus={true}
                                    style={{ flex: 1, height: 36, padding: 8, color: theme.colors.text }}
                                    returnKeyType="done"
                                    value={changeWhat === "Name" ? valueName : valuePhone}
                                    onChangeText={(text) =>
                                        changeWhat === "Name" ? setValueName(text) : setValuePhone(text)
                                    }
                                    onSubmitEditing={() => setModalVisible(!modalVisible)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* modal end */}
            <View style={{ flex: 1, backgroundColor: modalVisible ? bg : "transparent" }}>
                <View style={[theme.padding, { flex: 1 }]}>
                    <CustomHeader title="Edit Profile" />
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <UserAvatar name={name} size={100} bgColor={theme.colors.primary} />
                    </View>
                    <View style={{ flex: 1, marginVertical: 50, gap: 20 }}>
                        <TouchableOpacity
                            style={{ justifyContent: "space-between", flexDirection: "row" }}
                            onPress={() => {
                                setModalVisible(true);
                                setChangeWhat("Name");
                            }}
                        >
                            <Text style={{ color: theme.colors.text }}>Name</Text>
                            <Text style={{ color: theme.colors.text }}>{valueName}</Text>
                            <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ justifyContent: "space-between", flexDirection: "row" }}
                            onPress={() => {
                                setModalVisible(true);
                                setChangeWhat("Phone");
                            }}
                        >
                            <Text style={{ color: theme.colors.text }}>Phone</Text>
                            <Text style={{ color: theme.colors.text }}>{valuePhone}</Text>
                            <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ paddingBottom: 20 }} onPress={handleSave}>
                        <View
                            style={{
                                backgroundColor: theme.colors.primary,
                                padding: 10,
                                borderRadius: 5,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: theme.colors.text }}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default EditProfileScreen;
