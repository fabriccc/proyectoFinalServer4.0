



    //CALCULADORA IMC
    
    function calcularIMC() {
      var alturaEnCentimetros = parseInt(document.getElementById('altura').value);
      var alturaEnMetros = alturaEnCentimetros / 100;
      var pesoEnKilos = parseInt(document.getElementById('peso').value);
    
      var imc = Math.round(pesoEnKilos / (alturaEnMetros * alturaEnMetros));
      var clasificacion;
      
      if (imc < 18.5) {
        clasificacion = 'muy delgado';
      } else if (imc < 25) {
        clasificacion = 'saludable';
      } else if (imc < 30){
        clasificacion = 'en obesidad clase 1 (Bajo riesgo para tu salud)';
      }  else if (imc < 35){
        clasificacion = 'en obesidad clase 2 (Riesgo moderado para tu salud)';
      }else if (imc < 40){
        clasificacion = 'en obesidad clase 3 (Alto riesgo para tu salud)';
      }else if (imc < 50){
        clasificacion = 'en obesidad clase 4 morbida (Alto riesgo para tu salud)';
      }else if (imc >=200){
          clasificacion = 'en obesidad clase mortal (Te vas a morir)';
      }else {
        clasificacion = 'en obesidad clase 4 morbida (Alto riesgo para tu salud)';
      }
      /* Consejo:
      
      */
      var respuesta = 'Hola, tu indice de masa corporal es de ' + imc + ' y te encuentras ' + clasificacion;
      alert(respuesta);
    }

 
  
     
   
    