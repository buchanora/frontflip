import React, {Component} from 'react';
import {ContentRow, GridSection} from '../Scaffold/';
import {Upload} from '../InputField/';

export default class GalleryEditor extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      imageURLs:[],
      uploadStates: [],
    }
    this._handleAddImages = this._handleAddImages.bind(this);
    this._handleRemoveImages = this._handleRemoveImages.bind(this)
  }

  render(){
    const {initialGallery=[]}= this.props;

    const galleryArray = this.state.imageURLs.length>0 ? this.state.imageURLs :initialGallery;

    const imageGalleryGrid = galleryArray.map((item, index)=>{
      if(item){
        return (
          <div className='grid-section-item' key={`image_${index}`}>
            <img src={item} className='gallery-image' key={`image_${index}`}/>
          </div>
        )
      }else{
        return(
          <div className='grid-section-item' key={`image_${index}`}>
            <div className='gallery-item-placeholder'>{Math.floor(this.state.uploadStates[index])+'%'}</div>
          </div>
        )
      }

    });

    return(
      <div>
        <ContentRow>
          <Upload name='imageGallery'
              disabled={false}
              onChange={this._handleAddImages}
              label='Add Gallery Images'
              required={false}
              multiple={true} />
        </ContentRow>
        <GridSection>
          {
            imageGalleryGrid
          }
        </GridSection>
      </div>
    )
  }

  _handleAddImages(event){
    const storageRef = fireApp.storage().ref();
    let reader;

    let {onUploadSuccess, filePath, fileName, initialGallery}=this.props;

    const imageFiles = event.target.files;

    // const galleryArray = [];

    const currLength = this.state.imageURLs.length;

    if(!this.state.appended){
      this.setState((curState, props)=>{
        return{
          imageURLs: Array(imageFiles.length).fill(null, 0, imageFiles.length).concat(initialGallery),
          uploadStates: Array(imageFiles.length).fill(0, 0, imageFiles.length).concat(curState.uploadStates),
          appended: true,
        }
      });
    }else{
      this.setState((curState, props)=>{
        return{
          imageURLs: Array(imageFiles.length).fill(null, 0, imageFiles.length).concat(curState.imageURLs),
          uploadStates: Array(imageFiles.length).fill(0, 0, imageFiles.length).concat(curState.uploadStates),
          appended: true,
        }
      });

    }

    // console.log(this.state.imageURLs);

    for (let i = 0; i <imageFiles.length; i++){
      fileName = imageFiles[i].name;

      reader = new window.FileReader();

      reader.onload = (readEvent)=>{

        const uploader = storageRef.child(filePath+'/'+fileName)
        .put(readEvent.target.result);

        uploader.on('state_changed', (snapshot)=>{
          // console.log((snapshot.bytesTransferred/snapshot.totalBytes)*100 + ' uploaded');

          this.setState((curState)=>{
            let newArray = curState.uploadStates;
            newArray[i]=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            return{uploadStates: newArray}
          })
        }, ({code, error})=>{
          console.log(code+'\n'+errror);
        }, ()=>{
          //handle Success
          const imageURL = uploader.snapshot.downloadURL;

          this.setState((curState)=>{
            let newArray = curState.imageURLs;
            newArray[i]= imageURL;
            return{imageURLs: newArray}
          });

          // console.log(this.state.imageURLs);

          onUploadSuccess(this.state.imageURLs);

        });

      }

      reader.readAsArrayBuffer(imageFiles[i]);
    }
  }

  _handleRemoveImages(indices){}
}
