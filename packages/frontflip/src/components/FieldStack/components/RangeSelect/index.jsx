import React from 'react';
import TextField from '../TextField/'
import FieldGroup from '../FieldGroup/';

export default function RangeSelect (props){
  const { name='default', 
          onChange,
          onCheck,
          label, 
          minValue={},
          maxValue={},
          list, 
          min, 
          max,
          minLabel,
          maxLabel,
          minError,
          maxError} = props;

    const errorText = (val)=>{
      if (val > max) return 'Above ' + max
      if (val < min) return 'Below ' + min
    }

    return (<FieldGroup>
      <TextField type='number' 
                  onKeyUp={onCheck.bind(null, 'min')}  
                  onChange={onChange.bind(null, 'min')}  
                  value={minValue.value} 
                  error={minError && errorText(minValue.value)}
                  label={`Min: ${minLabel || min}`} 
                  name='min'/>
      <TextField type='number' 
                  onKeyUp={onCheck.bind(null, 'max')} 
                  onChange={onChange.bind(null, 'max')} 
                  value={maxValue.value} 
                  error={maxError && errorText(maxValue.value)}
                  label={`Max: ${maxLabel || max}`} 
                  name='max'/>
    </FieldGroup>)
}


// export function RangeSelect (props){
//   const {name='default', onChange, label, value, list, min, max} = props;
//   const stop = (max-min)/10;

//   function dataRange(min, max){
//     let options = [], option, num;

//     for (var i=min; i<=max; i+=stop ){
//       num = Math.floor(i)
//       if(i===min || i===max || i===(num/2)){
//         options.push(<span key={`option_${i}`} className='range-list-label'>{num}</span>)
//       }
//     }

//     return(
//       <div id={`${name}-range-list`.toLowerCase()} className='range-label-wrapper'>
//         {options}
//       </div>
//     )
//   }

//   return(
//     <div>
//       <input type='range' list={list} onChange={onChange} min={min} max={max} step={stop}/>
//       {dataRange(min, max)}
//     </div>
//   )
// }
