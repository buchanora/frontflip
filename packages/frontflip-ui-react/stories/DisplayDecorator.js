import React from 'react';

const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    textAlign: 'center',
    // backgroundColor: '#efefef',
    height: '100%'
};
const DisplayDecorator = (storyFn) => (
    <div style={styles}>
        { storyFn() }
    </div>
);

export default DisplayDecorator;