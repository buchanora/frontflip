import React, {Component} from 'react';


export default class Wizard extends Component{
  constructor(props){

    super(props);

    this.state = {
      activeStage: 1,
      loading: false,
    }

    this._handleBackClick = this._handleBackClick.bind(this);
    this._handleForwardClick = this._handleForwardClick.bind(this);
  }

  render(){
    const { content=[1, 5, 7] }= this.props;

    /**
     * Component that highlights the current active
     * step in the Wizard
     * @param {String} step the index of the current step
     * @param {Bool} last indicates if it is the last step in the process
     * @param {Bool} active indicates if it is the current active step
     */
    function Step({label, stepCount, isLastStep, isActiveStep}){
      return(
        <span className={`wizard-step-heading ${isLastStep? 'wizard-step-heading-last': ''}`}>
          <span className={`wizard-step-heading-step ${isActiveStep? 'wizard-active-step' : ''}`}>
            {<span className='wizard-step-heading-count'>{ Number(stepCount)+1 || '1' }</span>}
            {label && <span className='wizard-step-heading-label'>{label}</span>}
          </span>
          {isLastStep || <span className='wizard-step-heading-divider'></span>}
        </span>
      )
    }

    /**
     * Function that maps each step content section to
     * to a step component
     * @param item default Array.map first param
     * @param index default Array.map second params
     */
    function mapStepToComponent(item, index){
      // console.log(this.state.activeStage);
      return(
        <Step key={`step_${index}`}
              label={item.label || 'Step'}
              stepCount={index}
              isLastStep={index===content.length-1}
              isActiveStep={this.state.activeStage === index+1}/>
      )
    }
    // Return statement for Wizard Render Method
    return(
      <div className='wizard-wrapper'>

        <header className='wizard-header'>
          {content.map(mapStepToComponent.bind(this))}
        </header>

        <div className='wizard-body'>
          {content[this.state.activeStage-1].content && content[this.state.activeStage-1].content}
        </div>

        <footer className='wizard-footer'>
          <WizardNav  direction='left'
                      onClick={ content[this.state.activeStage-1].onBackClick
                                ? content[this.state.activeStage-1].onBackClick.bind(null, this._handleBackClick)
                                : this._handleBackClick}/>
          <WizardNav  direction='right'
                      onClick={ content[this.state.activeStage-1].onForwardClick
                                ? content[this.state.activeStage-1].onForwardClick.bind(null, this._handleForwardClick)
                                : this._handleForwardClick}/>
        </footer>

      </div>
    );
  }
  _handleBackClick(){
    this.setState((curState)=>{
      if (curState.activeStage!==1)
      return {
        activeStage: curState.activeStage-1
      }
      return {
        activeStage: curState.activeStage
      }
    });
  }
  _handleForwardClick(){
    // console.log(this.props);
    const length = this.props.content ?this.props.content.length  :3;
    this.setState((curState)=>{
      if (curState.activeStage!==length)
      return {
        activeStage: curState.activeStage+1
      }
      return {
        activeStage: curState.activeStage
      }
    });
  }
}

// Navigation Component in the Wizard footer
function WizardNav(props){
  const { direction,
          text,
          onClick }=props;
  return(
      <span onClick={onClick}
            className={`wizard-nav ${direction==='left' ?'wizard-nav-left' :'wizard-nav-right'}`}>
        <span className='wizard-nav-text'>{direction==='right' && (text || 'Next')}</span>
        <NavIcon direction={direction}/>
        <span className='wizard-nav-text'>{direction==='left'  && (text || 'Back')}</span>
      </span>
  )
}
// Arrow Icon Component in the Wizard Navigation Component
function NavIcon(props){
  return(
    <span className={`wizard-nav-icon ${props.direction==='left' ?'wizard-nav-icon-left' :'wizard-nav-icon-right'}`}>
        <i className={`icofont ${props.direction==='left' ?'icofont-rounded-left' :'icofont-rounded-right'}`}></i>
    </span>
  )
}
