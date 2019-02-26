import React, {Component} from 'react';
import Button from '../Button/';
import {elements} from '../FieldStack/';
import {Text} from '../TypeDeck/';
const {SelectOption} = elements;

export default class DataTable extends Component{

  render(){
    const { data = [[{ key:'burp', value:'Burp value', label: 'Sound', type: 'string', trigger: false}]],
            actions=[],
            imageBasePath = '',
            checkedRows=[],
            allChecked,
            onCheckAll=()=>{},
            onCheckRow,
            onEditItem,
            onDeleteItem,
            onDeleteMultiple } = this.props;

    const headRow = data[0].map((item, index)=>(
      <th   key={`heading_${index}`}
            className={(item.type === 'number' ? 'data-table-right-align' : '' + ' ' + hideOnMobile(item))}>
        {item.type!=='image' && item.label}
      </th>
    ));

    function mapRows(onEditItem, onDeleteItem, onCheckRow, checkedRows, item, index){
        if (Array.isArray(item))
        return <DataRow data={item} 
                        key={`row_${index}`}
                        actions={actions}
                        onEdit={onEditItem}
                        imageBasePath={imageBasePath}
                        onCheck={onCheckRow}
                        checked={checkedRows[index]}
                        onDelete={onDeleteItem}
                        rowIndex={index}/>
    }

    const bodyRows = data.map(mapRows.bind(null, onEditItem, onDeleteItem, onCheckRow, checkedRows));

    return(
      <table className='data-table'>
        <thead>
          <tr>
            <th><SelectOption onChange={onCheckAll} checked={allChecked}/></th>
            {headRow}
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {bodyRows}
        </tbody>
      </table>
    );
  }
}

class DataRow extends Component{
  constructor(props){
    super(props);
    this.state={
      rowContext: false,
    }
  }

  _handleMouseOver=()=>{
    // console.log('over');
    this.setState({
      rowContext:true,
    })
  }

  _handleMouseOut =()=>{
    // console.log('out');
    this.setState({
      rowContext:false,
    })
  }

  render(){
    const { data =[],
            actions,
            imageBasePath,
            rowIndex,
            onCheck,
            checked,
            onEdit,
            onDelete, } = this.props;

    let dataRow = data.map((item,index)=>{
      if(item.type === 'image'){
        return(
          <td key={`item_${index}`}
              className={'data-table-image' + ' ' + hideOnMobile(item)}
              onClick={this.state.rowContext && item.trigger && onEdit.bind(null, rowIndex)}>

            <span  style={{
              backgroundImage: `url(${imageBasePath + item.value})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}/>

          </td>
        )
      } else{
        return(
          <td key={`item_${index}`} style={item.trigger&&{width:300}}
              className={(item.type === 'number' ? 'data-table-right-align' : '')+ ' ' + hideOnMobile(item)}>
                { item.trigger
                  ? <span className = 'data-table-key' fontWeight='bold' onClick={onEdit && onEdit.bind(null, rowIndex)}>
                      {item.value}
                    </span>
                  : item.value
                  }
          </td>
        )
      }
    });

    return(
      <tr onMouseEnter={this._handleMouseOver} onMouseLeave={this._handleMouseOut}>
        <td>
          <SelectOption checked={checked} onChange={onCheck && onCheck.bind(null, rowIndex)}/>
        </td>
        {dataRow}
        {
          onEdit 
          &&  <td className='data-table-action-button-wrap'>
                <span className='data-table-action-button icofont icofont-ui-edit' 
                      onClick={onEdit && onEdit.bind(null, rowIndex)}/>
              </td>
        }
        {
          onDelete 
          &&  <td className='data-table-action-button-wrap'>
                <span className='data-table-action-button icofont icofont-ui-delete' 
                      onClick={onDelete && onDelete.bind(null,rowIndex)}/>
              </td>
          }
        { 
          actions.length > 0 &&
            actions.map((action, index)=>(
              <td className='data-table-action-button-wrap'
                  key={`action-${index}`}>
                <span onClick={action.onClick && action.onClick.bind(null, rowIndex)}
                      className={`data-table-action-button ${action.label? 'with-text-label': 'icon-label-only'}`}>
                    {action.iconClass && <i className={`${action.iconClass}`}/>}
                    {action.label || ''}
                </span>
              </td>
            ))
          }
      </tr>
    );
  }
}

function hideOnMobile(item){
  return item.hideOnMobile === true? 'hide-data-column' :''
}
