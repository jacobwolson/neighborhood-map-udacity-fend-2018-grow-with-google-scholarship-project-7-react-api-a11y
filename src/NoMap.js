// Source consulted: https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html

import React, { Component } from 'react'

class NoMapErrorBoundary extends Component {

    state = {
        mapError: false
    }

    componentDidCatch(error, info) {
        this.setState({mapError: true})
    }
   
    render() {
        if (this.state.hasError) {
            return <h1>Unable to load the map at this moment. Check your internet connection.</h1>
        } else {
            return this.props.children
    }

    }
}

export default NoMapErrorBoundary