import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';



export default class Wizard extends Component{
  constructor(props){

    super(props);

    this.state = {
      activeStage: 0,
      loading: false,
    }

    this._handleBackClick = this._handleBackClick.bind(this);
    this._handleForwardClick = this._handleForwardClick.bind(this);
  }

  render(){
    const { content=[{}, {}, {}], activeStage: active }= this.props;
    const activeStep = active || this.state.activeStage
    const activeStage = content[ activeStep];

    return(
      <div className='wizard-wrapper'>

        <StepHeader steps={content} activeStep={activeStep}/>
        <div className='wizard-body'>
          <CSSTransitionGroup transitionName="wizard-step"
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={300}>
            {
              activeStage.render({...activeStage.props, key: 'step_' + activeStep, moveForward: this._handleForwardClick, moveBack: this._handleBackClick})
            }
          </CSSTransitionGroup>
        </div>
        <footer className='wizard-footer'>
          <WizardNav  direction='left'
                      navState={this.props.prevButtonState}
                      onClick={ activeStage.onBack
                                ? activeStage.onBack.bind(null, this._handleBackClick)
                                : this._handleBackClick}/>
          <WizardNav  direction='right'
                      navState={this.props.nextButtonState}
                      onClick={ activeStage.onForward
                                ? activeStage.onForward.bind(null, this._handleForwardClick)
                                : this._handleForwardClick}/>
        </footer>

      </div>
    );
  }
  _handleBackClick(){
    this.setState((curState)=>{
      if (curState.activeStage!==0)
      return {
        activeStage: curState.activeStage-1
      }
      return {
        activeStage: curState.activeStage
      }
    });
  }
  _handleForwardClick(){
    console.log(this.props);
    const length = this.props.content ?this.props.content.length-1  :3;
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
          navState,
          text,
          onClick }=props;

  function navStateClasses(_navState){
    let classes = '';
    if(_navState.disabled){
      classes += ' wizard-nav-disabled';
    }
    if(!_navState.visible){
      classes += ' wizard-nav-hidden';
    }
    return classes;
  }
  console.log(navState);
  
  return(
      <span onClick={onClick}
            className={`wizard-nav ${navStateClasses(navState)} ${direction==='left' ?'wizard-nav-left' :'wizard-nav-right'}`}>
        <span className='wizard-nav-text'>
          {
            direction==='right'
            && (navState.label || text || 'Next')
          }
        </span>
        <NavIcon direction={direction}/>
        <span className='wizard-nav-text'>
        {
          direction==='left'
          && (navState.label || text || 'Back')
        }
        </span>
      </span>
  )
}
// Arrow Icon Component in the Wizard Navigation Component
function NavIcon(props){
  return(
    <span className={`wizard-nav-icon ${props.direction==='left' ?'wizard-nav-icon-left' :'wizard-nav-icon-right'}`}>
        <i className={`icofont ${props.direction==='left' ?'icofont-simple-left' :'icofont-simple-right'}`}></i>
    </span>
  )
}

function StepHeader(props){
  const{steps, activeStep} = props
  const count = steps.length;

  return (
    <header className='wizard-header'>
      {
        steps.map((item, index, array)=>{
          return(
            <Step key={`step_${index}`}
                  label={item.label || 'Step '+index}
                  index={index}
                  count={count}
                  isActive={activeStep === index}/>
          )
        })
      }
    </header>
  )
}

function Step(props){
  const {label, index, count, isActive} = props;
  const isLastStep = count==index+1;
  const isFirstStep = index === 0

  return(
    <span className={`wizard-step-heading ${isLastStep? 'wizard-step-heading-last': ''} ${isFirstStep? 'wizard-step-heading-first': ''} ${isActive? 'wizard-active-step' : ''}`}>
      {
        isFirstStep 
        || <span className='wizard-step-heading-divider'/>
      }

      <span className={`wizard-step-heading-step`}>
        {
          <span className='wizard-step-heading-count'>
            { Number(index)+1 || '1' }
          </span>
        }
      </span>
      {
        label
        &&  <span className='wizard-step-heading-label'>
              {label}
            </span>
      }
    </span>
  )
}
