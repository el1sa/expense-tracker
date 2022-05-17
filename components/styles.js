import { StyleSheet } from "react-native";

const categoryStyles = StyleSheet.create({
    title: {
        fontSize: 17,
        fontWeight: "bold",
        maxWidth: '100%',
        color: "grey",
    },
    subtitle: {
        fontSize: 17,
    },
    input: {
        fontSize: 18
    },
    inputView: {
        marginTop: 10

    },
    buttonView: {
        alignItems: 'stretch',
        marginBottom: 30,
    },
    buttonStyle: {
        width: 120,
        backgroundColor: '#39aea9'
    },
    totalButton: {
        width: 150,
        backgroundColor: '#39aea9',
        marginBottom: '5%'
    },
    container: {
        flex: 1,
        backgroundColor: '#dfe4ec',
    },
    listContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: '100%',
        maxWidth: '100%'

    },
    totalListContent: {
        height: 45,
        padding: 2,
        display: 'flex'

    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dfe4ec',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    buttonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#39aea9'

    },
    category1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#c27ba0"

    },
    category2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#8e7cc3"

    },
    category3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#f6b26b"

    },
    category4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#83bde5"

    },
    buttonTitle: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#e5efc1'
    }
})

export const styles = {
    categoryStyles,
    homeStyles,
}