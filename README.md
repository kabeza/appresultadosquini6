# App de Resultados del Quini 6
Aplicación en React Native que consume la API https://github.com/kabeza/node_quini6  
Obtiene los resultados de los sorteos  
Permite controlar boletas  
Generar numeros aleatorios basados en ultimos sorteos (?)  
etc.

_Aplicación desarrollada con_
- React Native
- React Navigation
- React Native Paper
- TypeScript

## Como bajar / ejecutar
- Descargar y seguir instrucciones del proyecto de API desde https://github.com/kabeza/node_quini6 
- Deployarlo en Heroku, render.com, Vercel, etc. (aqui se obtiene la url permanente en internet de la API)
- Clonar el presente repo en una carpeta vacía
- Crear archivo .env en la raiz de este proyecto
- Generar variable URL_API=https://WWW.XXX donde la url sea la url de la api deployada
- Ejecutar `yarn install` o `npm install` según el manejador de paquetes
- Ejecutar `npx react-native run-android` o `npx react-native run-ios`
* No tengo Mac por lo que no puedo garantizar que funcione en iOS

## NOTAS!


# TODO

- Agregar funcionalidades
- Optimizar el generador de números (basado en probabilidades, estadística y todas esas cosas que ni idea)
- Optimizar código
- etc.
