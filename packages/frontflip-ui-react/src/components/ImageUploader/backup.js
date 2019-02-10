import React, {Component} from 'react';
import {ContentRow} from '../Scaffold/';
import {Upload} from '../InputField/';


export default class ImageUploader extends Component{
  constructor(props){
    super(props);
    this.state = {
      imageUploadProgress: null,
      imageURL: ''
    }
    this._handleChangeProductImage = this._handleChangeProductImage.bind(this);
  }

  render(){
    const { onUploadSuccess,
            onUploadFailure,
            storagePath,
            initialImage,
            fileName}= this.props;

    const { imageUploadProgress, imageURL} = this.state;

    return(
      <div>
        <ContentRow>
          <Upload name='productImage'
              disabled={false}
              onChange={this._handleChangeProductImage}
              label='Select Product Image'
              required={false} />
        </ContentRow>

        <ContentRow>
          {
            (initialImage || imageURL)
              ? <img src={initialImage || imageURL}/>
              : <div className='image-upload-placeholder'>
                  {imageUploadProgress===null ? 'No image selected' :'Upload in progress: '+imageUploadProgress+'%'}
                </div>
          }
        </ContentRow>
      </div>
    );
  }

  _handleChangeProductImage(event){
    let {onUploadSuccess, filePath, fileName} = this.props;

    const storageRef = fireApp.storage().ref();

    const imageFile = event.target.files[0]

    if(!imageFile)return;

    if(!fileName) fileName = imageFile.name;

    console.log(fileName);

    const reader = new window.FileReader();

    this.setState({
      imageUploadProgress: null,
      imageURL: ''
    })

    // updateInventoryFieldValue('imagePath', fakePath);

    reader.onload = (readEvent)=>{

      const uploader = storageRef.child(filePath+'/'+fileName)
      .put(readEvent.target.result);
      // console.log(this.props.values.productKey);

      //Track upload task
      uploader.on('state_changed',
      (snapshot)=>{
        //track state
        // const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        this.setState({
          imageUploadProgress: (snapshot.bytesTransferred/snapshot.totalBytes)*100,
        })
        // console.log(progress);
      }, ({code, message})=>{
        //track errors
        console.log(code+ ' \n'+ message);
      }, ()=>{
        //Completion Callback
        const imageURL = uploader.snapshot.downloadURL;
        // console.log(imageURL);
        this.setState({
          imageURL: imageURL,
        })
        onUploadSuccess(imageURL);
      })
    };

    reader.readAsArrayBuffer(imageFile);

  }
}
