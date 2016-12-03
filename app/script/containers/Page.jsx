import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPhotos} from '../actions/PageActions';

class Page extends Component {

    render() {
        const {year, photos, fetching, error} = this.props.page;
        return (
            <div className='ib page'>
                {this.props.user ?
                        <p className="btnCont">
                            <button className='btn' onClick={(e) => this.props.getPhotos(+e.target.innerText)}>2014</button>
                            <button className='btn' onClick={(e) => this.props.getPhotos(+e.target.innerText)}>2015</button>
                            <button className='btn' onClick={(e) => this.props.getPhotos(+e.target.innerText)}>2016</button>
                        </p>
                    : ''
                }


                <h2>{year} год [{photos.length}]</h2>
                { error ? <p className='error'> Во время загрузки фото произошла ошибка</p> : '' }
                {
                    fetching ?
                        <p>Загрузка...</p>
                        :
                        photos.map((entry, index) =>
                            <div key={index} className='photo'>
                                <p><img src={entry.src}/></p>
                                <p>{entry.likes.count} ❤</p>
                            </div>
                        )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        page: state.page,
        user: state.user.name
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPhotos: getPhotos}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
