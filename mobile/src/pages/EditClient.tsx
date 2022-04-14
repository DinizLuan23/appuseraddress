import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { RadioButton } from 'react-native-paper';
import { InputForm } from '../components/InputForm';
import colors from "../styles/colors";

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FormData } from '../types';
import { Load } from '../components/Load';
import { atualizarCliente, buscarCep, buscarCliente, excluirCliente } from '../services/api';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const schema = Yup.object().shape({
   nome: Yup.string().required('Nome é obrigatório'),
   nascimento: Yup.string().required('Data de nascimento é obrigatória'),
   cep: Yup.string().required('CEP é obrigatório'),
   logradouro: Yup.string().required('Logradouro é obrigatório'),
   numero: Yup.number().required('Número é obrigatório'),
   uf: Yup.string().required('UF é obrigatório'),
   complemento: Yup.string(),
   bairro: Yup.string()
})

export function EditClient({ route }){
   const navigation = useNavigation();
   const { id } = route.params;

   const [checkSexo, setCheckSexo] = useState(1);
   const [checkTipoEndereco, setCheckTipoEndereco] = useState(1);
   const [idEndereco, setIdEndereco] = useState();

   const [loading, setLoading] = useState(false);

   const goBack = () => navigation.goBack();

   const { setValue, getValues, reset, control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

   useEffect(() => {
      async function getData(){
         try {
            setLoading(true);
            const result = await buscarCliente(id);
            if(result.cliente && result.enderecos){
               const { cliente, enderecos } = result;
               setValue('nome', cliente.name ?? "");
               setValue('nascimento', moment(cliente.birthday).format('DD/MM/YYYY') ?? "");
               setValue('cep', enderecos[0].cep ?? "");
               setValue('logradouro', enderecos[0].street ?? "");
               setValue('numero', enderecos[0].number ?? "");
               setValue('uf', enderecos[0].uf ?? "");
               setValue('bairro', enderecos[0].district ?? "");
               setValue('complemento', enderecos[0].complement ?? "");
               setCheckSexo(cliente.sex_id ?? 1);
               setCheckTipoEndereco(enderecos[0].type_id ?? 1);
               setIdEndereco(enderecos[0].address_id ?? '')
            }else{
               throw Error();
            }
         } catch (error) {
            ToastAndroid.show('Erro ao buscar o cliente, tente novamente.', ToastAndroid.CENTER);
         }finally {
            setLoading(false);
         }
      }

      getData();
   },[id])

   async function handleDelete(){
      try {
         setLoading(true);
         let result = await excluirCliente(id);
         if(result.result) {
            reset();
            navigation.navigate('Home', { id });
            ToastAndroid.show(`Cliente ${id} excluido com sucesso.`, ToastAndroid.CENTER);
         }else{
            throw Error();
         }
      } catch (error) {
         ToastAndroid.show('Erro ao excluir o cliente, tente novamente.', ToastAndroid.CENTER);
      }finally{
         setLoading(false);
      }
   }

   async function handleSave(form: FormData) {
      try {
         setLoading(true);
         const nascimento = moment(form.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
         let dados = {...form, sexo: checkSexo, tipo: checkTipoEndereco, clientId: id, idEndereco, nascimento};
         let result = await atualizarCliente(dados);
         if(result.address_id && result.client_id){
            reset();
            navigation.navigate('Home', { id });
            ToastAndroid.show(`Cliente ${result.client_id} alterado com sucesso.`, ToastAndroid.CENTER);
         }else{
            throw Error();
         }
      } catch (error) {
         ToastAndroid.show('Erro ao salvar o cliente, tente novamente.', ToastAndroid.CENTER);
      }finally{
         setLoading(false);
      }
   }

   async function handleBlur() {
      try {
         setLoading(true);
         let cep = getValues('cep');
         const response = await buscarCep(cep);
         if(response){
            setValue('logradouro', response.logradouro);
            setValue('bairro', response.bairro);
            setValue('complemento', response.complemento);
            setValue('uf', response.uf);
         }else{
            throw Error();
         }
      } catch (error) {
         ToastAndroid.show('Nenhum endereço encontrado para esse CEP!', ToastAndroid.SHORT);
      }finally{
         setLoading(false);
      }
   }

   return (
      <View style={{height: '100%'}}>
         { loading && <Load /> }
         <View style={styles.header}>
            <TouchableOpacity
               onPress={goBack}
               style={{flex: 1}}
            >
               <AntDesign name="home" size={30} color="#fff"/>
            </TouchableOpacity>
            <Text style={styles.headerText}> Editar </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1}}>
               <TouchableOpacity
                  onPress={handleDelete}
               >
                  <FontAwesome name="trash-o" size={30} color="red"/>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={handleSubmit(handleSave)}
               >
                  <AntDesign name="save" size={30} color="#fff"/>
               </TouchableOpacity>
            </View>
         </View>
         <ScrollView contentContainerStyle={styles.scrollBody}>
            <View style={styles.cardDados}>
               <Text style={styles.cardText}>Dados Pessoais</Text>
               <InputForm
                  name='nome'
                  control={control}
                  mode='outlined'
                  outlineColor={colors.purple900}
                  label="Nome*"
                  error={errors.nome && errors.nome.message}
               />
               <InputForm
                  name='nascimento'
                  control={control}
                  mode='outlined'
                  outlineColor={colors.purple900}
                  label="Data de nascimento*"
                  maxLength={10}
                  keyboardType="numeric"
                  error={errors.nascimento && errors.nascimento.message}
               />
               <View style={{...styles.viewRadioButton, justifyContent: 'space-around', width: '100%', marginVertical: 10}}>
                  <View style={styles.viewRadioButton}>
                     <RadioButton
                        status={ checkSexo === 1 ? 'checked' : 'unchecked' }
                        onPress={() => {
                           setCheckSexo(1);
                        }}
                        color={colors.purple900}
                     />
                     <Text>Masculino*</Text>
                  </View>
                  <View style={styles.viewRadioButton}>
                     <RadioButton
                        status={ checkSexo === 2 ? 'checked' : 'unchecked' }
                        onPress={() => {
                           setCheckSexo(2);
                        }}
                        color={colors.purple500}
                     />
                     <Text>Feminino*</Text>
                  </View>
               </View>
            </View>
               <View style={styles.cardDados}>
                  <Text style={styles.cardText}>Dados de Endereço</Text>
                  <InputForm
                     name='cep'
                     control={control}
                     mode='outlined'
                     outlineColor={colors.purple900}
                     onBlur={handleBlur}
                     label="CEP*"
                     maxLength={9}
                     keyboardType="numeric"
                     error={errors.cep && errors.cep.message}
                  />
                  <InputForm
                     name='logradouro'
                     control={control}
                     mode='outlined'
                     outlineColor={colors.purple900}
                     label="Logradouro*"
                     error={errors.logradouro && errors.logradouro.message}
                  />
                  <InputForm
                     name='numero'
                     control={control}
                     mode='outlined'
                     outlineColor={colors.purple900}
                     label="Numero"
                     keyboardType="numeric"
                     error={errors.numero && errors.numero.message}
                  />
                  <InputForm
                     name='uf'
                     control={control}
                     mode='outlined'
                     outlineColor={colors.purple900}
                     label="UF"
                     error={errors.uf && errors.uf.message}
                  />
                  <View style={{...styles.viewRadioButton, justifyContent: 'space-around', width: '100%', marginVertical: 10}}>
                     <View style={styles.viewRadioButton}>
                        <RadioButton
                           status={ checkTipoEndereco === 1 ? 'checked' : 'unchecked' }
                           onPress={() => setCheckTipoEndereco(1)}
                           color={colors.purple900}
                        />
                        <Text>Residencial*</Text>
                     </View>
                     <View style={styles.viewRadioButton}>
                        <RadioButton
                           status={ checkTipoEndereco === 2 ? 'checked' : 'unchecked' }
                           onPress={() => setCheckTipoEndereco(2)}
                           color={colors.purple500}
                        />
                        <Text>Comercial*</Text>
                     </View>
                  </View>
                  <InputForm
                     name='complemento'
                     control={control}
                     mode='outlined'
                     outlineColor={colors.purple900}
                     label="Complemento"
                     error={errors.Complemento && errors.Complemento.message}
                  />
                  <InputForm
                     name='bairro'
                     control={control}
                     mode='outlined'
                     outlineColor={colors.purple900}
                     label="Bairro"
                     error={errors.Bairro && errors.Bairro.message}
                  />
               </View>
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   header:{
      backgroundColor: colors.purple900,
      height: 100,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 20
   },
   headerText:{
      flex: 1,
      color: colors.white,
      fontWeight: '700',
      fontSize: 24,
   },
   scrollBody:{
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingBottom: 20
   },
   cardDados:{
      backgroundColor: colors.white,
      borderRadius: 4,
      width: '95%',
      marginTop: 20,
      paddingHorizontal: 10,
      paddingVertical: 25,
      alignItems: 'center'
   },
   cardText:{
      color: colors.heading,
      fontWeight: '700',
      fontSize: 22,
      marginBottom: 25
   },
   viewRadioButton:{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
   }
});