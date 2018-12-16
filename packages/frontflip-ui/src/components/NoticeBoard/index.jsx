import React from 'react'
import Notice from '../Notice/'
import {CSSTransitionGroup} from 'react-transition-group'

export default function NoticeBoard (props) {
    const { onCloseNotice, 
            notices } = props;
    return (
        <CSSTransitionGroup transitionName="fade"
                            className="noticeBoard"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
            {
                notices.map((notice, index)=>{
                    <Notice message={notice.message} close={onCloseNotice.bind(null, index)}/>
                })
            }
        </CSSTransitionGroup>
    )
}
