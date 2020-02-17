
window.preAssert = function(conditionTrue, msgOnError){
  if(!conditionTrue){
    if(undefined == msgOnError){msgOnError='Une erreur est survenue'};
    // console.error(msgOnError);
    console.error(msgOnError);
    throw(msgOnError);
  }
};
