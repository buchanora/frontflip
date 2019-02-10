import React, {Component} from 'react';
import qs from 'query-string';
import {ContentRow} from '../Scaffold/';
import {UploadField as Upload} from '../FieldStack/';
import Loader from '../Loader/';

import fireApp from '../../config/fireApp';

import {uploadFile, updateFile, deleteFile} from '../../api/upload';


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
            sphere,
            label,
            width,
            height,
            storagePath='',
            fileType,
            initialImage,
            fileName }=this.props;

    const { imageUploadProgress, imageURL} = this.state;
    const imagePath = storagePath + initialImage;

    return(
               <div   className={`image-upload-placeholder ${sphere? 'imageUploader-sphere': 'imageUploader-rect'}`}
                      onMouseEnter={this._handleMouseEnter}
                      onMouseLeave={this._handleMouseLeave}>


                  {   (initialImage || imageURL)
                      ? <div  className='imageUploader-image-wrap'
                              style={{height: height, 
                                      width: width,
                                      backgroundImage: `url(${ imagePath || imageURL})`,
                                      backgroundSize: 'cover',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundPosition: 'center'
                                    }}>

                          {
                            (initialImage || imageURL) &&
                            <img  src={imagePath || imageURL} 
                                  className='imageUploader-image'/>
                          }

                          { this.state.mouseoverContext &&
                            <div className='image-upload-hover-context-wrap'>
                              {
                                this.state.imageUploadProgress
                                ? <Loader/>
                                : <i  className='image-delete-icon icofont icofont-close'
                                      onClick={this._handleDeleteImage}></i>
                              }
                              
                            </div>
                          }
                        </div>

                      : <div className='image-upload-button-wrap'>
                          <Upload name={`${label}Image`}
                              icon={sphere && 'camera'}
                              disabled={false}
                              onChange={this._handleChangeImage}
                              label={label && ('Upload ' + label + ' image')}
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

    let { onUploadSuccess,
          uploadProgress,
          imageURL,
          fileType,
          storagePath, //the base server url for downloading image from server,
          fileName,
          user } = this.props;

    const imageFile = event.target.files[0]

    if(!imageFile)return;

    if(!fileName) fileName = imageFile.name;

    const reader = new window.FileReader();

    this._updateUploadProgress(0, '');

    reader.onload = (readEvent)=>{
      const file = readEvent.target.result;
      this._updateUploadProgress(true, file)

      const formData = new FormData();
      formData.append(fileType || 'file', imageFile )

      this._updateImage(formData, fileType ,imageURL, onUploadSuccess)
    };

    reader.readAsDataURL(imageFile);

  }

  _updateImage(formData, filePath, prevImageURL, cb){

    uploadFile(formData, filePath, prevImageURL)
    .then(response=>{
      console.log(response);
      const imageURL = response.payload.imageURL;
      this._updateUploadProgress(false, this.props.storagePath + imageURL);
      cb && cb(null, imageURL);
    })
    .catch(error=>{
      console.log(error);
      cb(error)
    })

  }
  _deleteImage(fullPath, cb){
    deleteFile(fullPath)
    .then(response=>{
      cb(null, response);
    })
    .catch(error=>{
      cb(error);
      console.log(error);
    })
  }

  _updateUploadProgress(progress, imageURL){
    this.setState(()=>({
      imageUploadProgress: progress,
      imageURL: imageURL,
    }))
  }

  _handleDeleteImage(event){

    const { onDeleteSuccess,
            onDeleteFailure,
            storagePath,
            fileType,
            initialImage} = this.props;

    const downloadURL = this.state.imageURL || initialImage;
    const comps = downloadURL.split('/');
    const imageURL = comps[comps.length-1]


    this.setState({
      imageDeleteInProgress: true,
    })
    this._updateUploadProgress(true)

    deleteFile(imageURL, fileType)
    .then(response=>{
      const imageURL = response.imageURL;
      console.log(imageURL);
      this._updateUploadProgress(false, null)
      onDeleteSuccess && onDeleteSuccess(null, response);
    })
    .catch((error)=>{
      //track errors
      this._updateUploadProgress(false, null);
      onDeleteFailure && onDeleteFailure(error);
      console.log(error);
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
