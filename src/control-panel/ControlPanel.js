import React, { Component } from 'react';
import './ControlPanel.css';


class ControlPanel extends Component {
    constructor (props) {
        super(props);
    }


    selectSuggestion = (event) => {
        this.props.setSuggestion(event.target.value);
    }

    render () {
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button
                        className={`format-action ${this.props.bold ? 'active' : ''}`}
                        type="button"
                        onClick={() => this.props.activeMode('bold')}
                    >
                        <b>B</b>
                    </button>
                    <button
                        className={`format-action ${this.props.italic ? 'active' : ''}`}
                        type="button"
                        onClick={() => this.props.activeMode('italic')}
                    >
                        <i>I</i>
                    </button>
                    <button
                        className={`format-action ${this.props.underline ? 'active' : ''}`}
                        type="button"
                        onClick={() => this.props.activeMode('underline')}
                    >
                        <u>U</u>
                    </button>
                </div>
                <div className='thesaurus'>
                        Thesaurus
                        <select
                            onChange={this.selectSuggestion}
                        >
                            {this.props.suggestions.map( el => <option value={el}>{el}</option>)}
                        </select>
                        <button
                            type='button'
                            onClick={this.props.activateReplace}
                        >
                            Replace last
                        </button>
                    </div>
            </div>
        );
    }
}


export default ControlPanel;
