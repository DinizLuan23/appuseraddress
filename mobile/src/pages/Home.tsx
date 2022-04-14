import React, { useEffect, useState } from "react";
import {
   View,
   StyleSheet,
   Text,
   ImageBackground,
   TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//components
import { DataTable } from 'react-native-paper';

//imagens
const fundo = require("../images/fundo.jpg");

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//utils
import colors from "../styles/colors";
import { LoadInfo } from "../components/LoadInfo";
import { buscarClientes } from "../services/api";
import moment from "moment";

const opcoesPorPagina = 6;

export const Home = ({ route }) => {
   const id =  route?.params?.id ?? 0;
   const navigation = useNavigation();

   const [loadInfo, setLoadInfo] = useState(false);
   const [clients, setClients] = useState([]);

   const [page, setPage] = useState<number>(0)
   const [itemsPorPagina, setItemsPorPagina] = useState(opcoesPorPagina)
   const from = page * itemsPorPagina;
   const to = Math.min((page + 1) * itemsPorPagina, clients.length);
   
   useEffect(() => {
      setPage(0);
    }, [itemsPorPagina]);

   useEffect(() => {
      async function getData() {
         setLoadInfo(true);
         try {
            const result = await buscarClientes();
            if(result){
               setClients(result);
            }else{
               setClients([]);
            }
         } catch (error) {
            console.log(error);
         } finally {
            setLoadInfo(false);
         }
      }
      getData();
   }, [id]);

   return loadInfo ? (
      <LoadInfo />
   ) : (
      <ImageBackground source={fundo} resizeMode="cover" style={styles.fundo}>
         <View style={styles.headerBar}>
            <TouchableOpacity
               style={styles.btnHeader}
               onPress={()=>navigation.navigate('Register')}
            >
               <AntDesign name="adduser" size={40} color="#fff"/>
            </TouchableOpacity>
         </View>
         <View style={styles.container}>
            {
               clients.length > 0 ? (
                  <DataTable>
                     <DataTable.Header>
                        <DataTable.Title>ID</DataTable.Title>
                        <DataTable.Title>Nome</DataTable.Title>
                        <DataTable.Title>Nascimento</DataTable.Title>
                        <DataTable.Title numeric>Sexo</DataTable.Title>
                     </DataTable.Header>
                     {
                        clients.map((client, i) => {
                           return i < ((page + 1) * opcoesPorPagina) && i >= (page * opcoesPorPagina) && (
                              <DataTable.Row key={client.client_id} onPress={()=>navigation.navigate('EditClient', { id: client.client_id })}>
                                 <DataTable.Cell>{client.client_id}</DataTable.Cell>
                                 <DataTable.Cell>{client.name}</DataTable.Cell>
                                 <DataTable.Cell>{ moment(client.birthday).format('DD/MM/YYYY')}</DataTable.Cell>
                                 <DataTable.Cell numeric>{client.sex_id == 1 ? 'Masculino' : 'Feminino'}</DataTable.Cell>
                              </DataTable.Row>
                           )
                        })
                     }
                     <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(clients.length / itemsPorPagina)}
                        onPageChange={page => setPage(page)}
                        label={`${from + 1}-${to} de ${clients.length}`}
                        optionsPerPage={opcoesPorPagina}
                        itemsPerPage={itemsPorPagina}
                        setItemsPerPage={setItemsPorPagina}
                        showFastPagination
                        optionsLabel={'Rows per page'}
                     />
                  </DataTable>
               ) : (
                  <View style={styles.viewNotFound}>
                     <AntDesign name="frowno" size={50} color="#D55DFF"/>
                     <Text style={styles.textNotFound}> Nenhum cliente {'\n'} encontrado. </Text>
                  </View>
               )
            }
         </View>
      </ImageBackground>
   );
};

const styles = StyleSheet.create({
   container: {
      width: "90%",
      height: "85%",
      backgroundColor: colors.white,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
   },
   fundo: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
   },
   headerBar:{
      width: '100%',
      alignItems:'flex-end',
      paddingHorizontal: 10
   },
   btnHeader:{
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
   },
   textNotFound:{
      fontSize: 20,
      fontWeight: '700',
      marginTop: 10,
      textAlign: 'center'
   },
   viewNotFound:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   }
});
