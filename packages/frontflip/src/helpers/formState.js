const form = {

    hydrate: (savedValues)=>{
        return {
          activeField: null,
          fields: [],
          values: savedValues || {},
          errors: {},
          errorMessage: null
        }
    },

    clear : (values)=>{
      const newValues = {}
      for(let val in values){
        if(values.hasOwnProperty(val)){
          newValues[val] = ''
        }
      }
      
      return {
        values: newValues,
      }
    },

    updateValue: (values, payload) => {
        const {value, name} = payload;

        const newValues = {...values, [name]:value};

        return newValues;
    },

    toggleMultiSelect: (values, payload)=>{
      const {name, option} = payload;
      let newValues={...values};
      if (newValues.hasOwnProperty([name])){
        if(newValues[name][option]){
          delete newValues[name][option];
        }else{
          newValues[name][option] = option
        }

      }else{
        newValues[name]={};
        newValues[name][option] = option
      }
      return newValues;
    },

    next: (fieldState, payload) => {
      const {currentIndex} = payload;
      const nextState = [...fieldState]
      nextState[currentIndex].active = false;
      nextState[currentIndex + 1].active = true;
      return nextState;
    }
}

export default form;
