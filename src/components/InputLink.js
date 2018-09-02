import React, { Component } from 'react'
import copy from 'copy-to-clipboard'
const EN_API = 'dWT8OFMN6G3UcaC7BABS2jWIRIfFSyvO'
const EnvatoAPI = require('../envato.api')(EN_API, 'USER_AGENT')


export default class InputLink extends Component {
    state = {
        id: '',
        itemInfo: {},
        error: false,
        alert: {
            msg: 'Something is wrnog',
            type: 'danger'
        }
    }

    handleOnChange = e => {
        this.setState({
            id: e.target.value
        })

        if (this.state.id) {
            EnvatoAPI.getItem({
                id: parseInt(e.target.value)
            })
            .then(response => {
                if (response.site === 'themeforest.net') {
                    this.setState({
                        itemInfo: response
                    })
                } else {
                    this.setState({
                        error: true
                    })
                }
            })
            .catch(err => {
                this.setState({
                    error: true
                })
            })
        }
    }

    componentWillMount = () => {
        EnvatoAPI.getItem({
            id: 20226239
        })
        .then(response => {
            this.setState({
                itemInfo: response,
                id: '20226239'
            })
            console.log(response)
        })
        .catch(err => {
            this.setState({
                error: true
            })
        })
    }
    
    Alert = () => {
        setTimeout(() => {
            this.setState(prevState => ({
                error: !prevState.error
            }))
        }, 1000);
        return <div className={'alert alert-' + this.state.alert.type} role="alert">{this.state.alert.msg}</div>
    }

    

    render() {
        return (
            <div>
                <form className="card">
                    <div className="card-body">
                        
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">id</span>
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="item_id"
                                    aria-label="item_id"
                                    aria-describedby="basic-addon1"
                                    value={this.state.id || ''}
                                    onChange={this.handleOnChange}
                                    onPaste={this.handleOnChange}
                                    // onKeyUp={this.handleOnChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            {
                                // this.state.itemInfo.name && 
                                // <div className="input-group">
                                //     <input
                                //         type="number"
                                //         className="form-control"
                                //         placeholder="Title"
                                //         value={this.state.itemInfo.name}
                                //         readOnly
                                //         onClick={e => {
                                //             copy(this.state.itemInfo.name)
                                //             this.setState({
                                //                 error: true,
                                //                 alert: {
                                //                     msg: 'Item Title copied',
                                //                     type: 'success'
                                //                 }
                                //             })
                                //         }}
                                //     />
                                // </div>
                            }
                            <h2 
                                className="heading"
                                onClick={e => {
                                    copy(this.state.itemInfo.name)
                                    this.setState({
                                        error: true,
                                        alert: {
                                            msg: 'Item Title copied',
                                            type: 'success'
                                        }
                                    })
                                }}
                            >{this.state.itemInfo.name}</h2>
                        </div>

                        <div className="form-group">
                            {
                                this.state.itemInfo.url && 
                                <div>
                                    <label>Item information URL</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="item url"
                                            aria-describedby="basic-addon1"
                                            value={this.state.itemInfo.url || ''}
                                            readOnly
                                            onClick={e => {
                                                copy(e.target.value)
                                                this.setState({
                                                    error: true,
                                                    alert: {
                                                        msg: 'Item URL copied',
                                                        type: 'success'
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="form-group">
                            {
                                this.state.itemInfo.previews && 
                                <div>
                                    <label>Item Live Preview URL</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="live_preview"
                                            aria-label="live_preview"
                                            aria-describedby="basic-addon1"
                                            value={'https://themeforest.net' + (this.state.itemInfo.previews.live_site.href || '') }
                                            readOnly
                                            onClick={e => {
                                                copy(e.target.value)
                                                this.setState({
                                                    error: true,
                                                    alert: {
                                                        msg: 'Live Preview copied',
                                                        type: 'success'
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="form-group">
                            {
                                this.state.itemInfo.previews && 
                                <div>
                                    <label>Item Preview Image</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="image_url"
                                            aria-label="image_url"
                                            aria-describedby="basic-addon1"
                                            value={(this.state.itemInfo.previews && this.state.itemInfo.previews.landscape_preview.landscape_url) || ''}
                                            readOnly
                                            onClick={e => {
                                                copy(e.target.value)
                                                this.setState({
                                                    error: true,
                                                    alert: {
                                                        msg: 'Image URL copied',
                                                        type: 'success'
                                                    }
                                                })
                                                ///fileDownload(e.target.value, this.state.itemInfo.name.split('-')[0].split('|')[0].trim() + '.' + this.state.itemInfo.previews.landscape_preview.landscape_url.split('/').pop().split('.').pop() )
                                            }}
                                        />
                                        <div className="input-group-append">
                                            <a 
                                                href={(this.state.itemInfo.previews && this.state.itemInfo.previews.landscape_preview.landscape_url) || ''} 
                                                target="_blank" 
                                                className="input-group-text"
                                            > open </a>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        {
                            this.state.itemInfo.tags && 
                            <div className="form-group">
                                <label>Item Tags</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="live_preview"
                                        aria-label="live_preview"
                                        aria-describedby="basic-addon1"
                                        value={this.state.itemInfo.tags || ''}
                                        readOnly
                                        onClick={e => {
                                            copy(e.target.value)
                                            this.setState({
                                                error: true,
                                                alert: {
                                                    msg: 'Item tag copied',
                                                    type: 'success'
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        }
                        {
                            this.state.error && <this.Alert />
                        }
                    </div>
                </form>
            </div>
        )
    }
}

