import 'aframe';
import './App.css';
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import {Scene, Entity} from 'aframe-react';
import {Observable} from 'rx';
import {DOM} from 'rx-dom';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: []
        };
    }

    componentWillMount() {
        DOM.ajax('/data.json')
            .map(data=> JSON.parse(data.response).works)
            .map(books => books.map(({cover_id, title, authors})=> ({cover: `/${cover_id}.jpg`, title, authors})))
            .subscribe(data=> this.setState({books: data}));
    }
    render() {
        return (
            <Scene>
                {this.state.books.map((book, idx) => (
                    <Entity key={idx} geometry={{primitive: 'box', width:0.2, height: 2, depth: 1}} material= {{src: `url(${book.cover})`}} position={[0, 0, (-5 * idx)]}/>)
                )}

            </Scene>
        );
    }
}

export default App;
