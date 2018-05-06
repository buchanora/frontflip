import React, {Component} from 'react';
import {ContentRow} from '../Scaffold/';
import {Upload} from '../InputField/';

import fireApp from '../../config/fireApp';


export default class ImageUploader extends Component{
  constructor(props){
    super(props);

    this.state = {
      imageUploadProgress: null,
      imageURL: ''
    }

    this._handleChangeImage = this._handleChangeImage.bind(this);
    this._handleDeleteImage = this._handleDeleteImage.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  render(){
    const { onUploadSuccess,
            onUploadFailure,
            onDeleteSuccess,
            onDeleteFailure,
            label = '',
            storagePath,
            initialImage,
            fileName }=this.props;

    const { imageUploadProgress, imageURL} = this.state;

    return(
               <div   className='image-upload-placeholder'
                      onMouseEnter={this._handleMouseEnter}
                      onMouseLeave={this._handleMouseLeave}>

                  { this.state.imageUploadProgress

                    ? <div className='image-upload-button-wrap'>
                      {console.log(imageUploadProgress)}
                        <Progress progress={imageUploadProgress}/>
                      </div>

                    : (initialImage || imageURL)
                        ? <div className='imageUploader-image-wrap'>

                            <i  className='image-delete-icon icofont icofont-ui-close'
                                onClick={this._handleDeleteImage}></i>

                            <img src={initialImage || imageURL} className='imageUploader-image'/>

                            { this.state.mouseoverContext &&
                              <div className='image-upload-hover-context'>
                                <Upload   name={`${label}Image`}
                                          disabled={false}
                                          onChange={this._handleChangeImage}
                                          label={`Change ${label} image`}
                                          required={false} />

                              </div>
                            }
                          </div>

                        : <div className='image-upload-button-wrap'>
                          <i className='icofont icofont-camera'></i>
                            <Upload name={`${label}Image`}
                                disabled={false}
                                onChange={this._handleChangeImage}
                                label={`Select ${label} image`}
                                required={false} />
                          </div>
                      }
                </div>
    );
  }
  _handleMouseEnter(){
    this.setState({
      mouseoverContext: true
    })
  }
  _handleMouseLeave(){
    this.setState({
      mouseoverContext: false
    })
  }

  _handleChangeImage(event){

    let {onUploadSuccess, storagePath, fileName} = this.props;
    // const setState = this.setState;

    // console.log(fileName);

    const storageRef = fireApp.storage().ref();

    const imageFile = event.target.files[0]

    if(!imageFile)return;

    if(!fileName) fileName = imageFile.name;

    // console.log(fileName);

    const reader = new window.FileReader();

    this.setState(()=>({
      imageUploadProgress: 0,
      imageURL: ''
    }))

    // updateInventoryFieldValue('imagePath', fakePath);

    reader.onload = (readEvent)=>{

      const uploader = storageRef.child(storagePath+'/'+fileName)
      .put(readEvent.target.result);
      // console.log(this.props.values.productKey);

      //Track upload task
      uploader.on('state_changed',
      (snapshot)=>{
        //track state
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        this.setState(()=>({
          imageUploadProgress: progress,
        }))
        // console.log(progress);
      }, ({code, message})=>{
        //track errors
        console.log(code+ ' \n'+ message);
      }, ()=>{
        //Completion Callback
        const imageURL = uploader.snapshot.downloadURL;
        console.log(imageURL);
        this.setState(()=>({
          imageUploadProgress: false,
          imageURL: imageURL,
        }))
        onUploadSuccess && onUploadSuccess(imageURL);
      })
    };

    reader.readAsArrayBuffer(imageFile);

  }

  _handleDeleteImage(event){

    const {onDeleteSuccess, onDeleteFailure, storagePath, initialImage} = this.props;
    // const {setState} = this;
    const downloadURL = this.state.imageURL || initialImage;
    const fileName = parseDownloadURL(downloadURL);
    const storageRef = fireApp.storage().ref();

    this.setState({
      imageDeleteInProgress: true,
    })
    console.log(storagePath);

    storageRef.child(storagePath+'/'+fileName)
    .delete()
    .then(()=>{
        //Completion Callback
        this.setState({
          imageURL: null,
          imageDeleteInProgress: false,
        })
        onDeleteSuccess && onDeleteSuccess(null);
      }
    )
    .catch(({code, message})=>{
      //track errors
      onDeleteFailure && onDeleteFailure(fileName)
      console.log(code+ ' \n'+ message);
    })
  }
}

function Progress({progress}){
  return(
    <div>
      Uploading
      <div className='progress-wrapper'>
        <div className='progress' style={{width: progress + '%'}}></div>
      </div>
    </div>

  )
}

function parseDownloadURL(url){
  const parseArray = url.split('%2F');
  return parseArray[parseArray.length-1].split('?')[0]
}
