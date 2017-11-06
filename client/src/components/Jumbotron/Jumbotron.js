import React from 'react';

const styles = {
	jumbo: {
		backgroundColor: '#20315A',
		color: 'white'
	}
}

const Jumbotron = ({ children }) =>
    <div style={styles.jumbo} className="jumbotron">
        {children}
    </div>

export default Jumbotron;