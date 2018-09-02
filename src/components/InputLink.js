import React, { Component } from 'react'
import copy from 'copy-to-clipboard'
const EN_API = 'dWT8OFMN6G3UcaC7BABS2jWIRIfFSyvO'
const fileDownload = require("js-file-download")
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
                        {
                            this.state.error && <this.Alert />
                        }
                        <div className="form-group">
                            <label>Paste your item ID here</label>
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
                                                copy(this.state.itemInfo.url)
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
                                    <label>Item information URL</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="live_preview"
                                            aria-label="live_preview"
                                            aria-describedby="basic-addon1"
                                            value={'https://themeforest.net/' + (this.state.itemInfo.previews.live_site.href || '') }
                                            readOnly
                                            onClick={e => {
                                                copy(this.state.itemInfo.url)
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
                                    <label>Item information URL</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="image_url"
                                            aria-label="image_url"
                                            aria-describedby="basic-addon1"
                                            value={'https://themeforest.net/' + (this.state.itemInfo.previews && this.state.itemInfo.previews.landscape_preview.landscape_url) || ''}
                                            readOnly
                                            onClick={e => {
                                                fileDownload(e.target.value, this.state.itemInfo.name.split('-')[0].split('|')[0].trim() + '.png' )
                                            }}
                                        />
                                    </div>
                                </div>
                            }
                        </div>

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
                                        copy(this.state.itemInfo.url)
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
                    </div>
                </form>
            </div>
        )
    }
}
