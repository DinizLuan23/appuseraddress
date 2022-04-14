import React from 'react';

//Types
import { Control, Controller } from 'react-hook-form';
import { TextInputProps, View, Text, StyleSheet } from 'react-native';

//Componets
import { TextInput } from 'react-native-paper';
import colors from '../styles/colors';
import { formatarAniversario } from '../utils/formatarAniversario';
import { formatarCep } from '../utils/formatarCep';


interface Props extends TextInputProps{
   control: Control;
   name: string;
   error: string;
}

export function InputForm({control, name, error, ...rest}: Props){

   return(
      <View style={styles.container}>
         <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => {
               
               if(value){
                  switch (name){
                     case 'nascimento':
                        value = formatarAniversario(value);
                     break;
                     case 'cep':
                        value = formatarCep(value);
                     break;
                  }
               }

               return(
                  <TextInput
                     onChangeText={onChange}
                     onBlur={onBlur}
                     value={value}
                     style={styles.input}
                     {...rest}
                  />
               )
            }}
            name={name}
         />
         {error && <Text style={styles.textError}>{ error }</Text>}
      </View>
   );
}

const styles = StyleSheet.create({
   container:{
      width: '85%',
      marginBottom: 5
   },
   input:{
      backgroundColor: colors.white,
      height: 55,
   },
   textError:{
      fontSize: 14,
      color: '#f44336',
      marginTop: 3
   }
})