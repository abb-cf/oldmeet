import React, { Component } from 'react';
// import { mockData } from './mock-data';
// import { extractLocations } from './api';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined,
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        if (!this.props.locations) return "no data";
        if(!Array.isArray(this.props.locations)) return "results are not array";
        const suggestions = this.props.locations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });

        if (suggestions.length === 0) {
        this.setState({
            query: value,
            suggestions: [],
            showSuggestions: false,
        });
        } else {
        return this.setState({
            query: value,
            suggestions: suggestions,
        });
        }
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            suggestions: [],
            showSuggestions: false,
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <div className="CitySearch">
                <input 
                    type="text"
                    className="city"
                    placeholder="Search for a City"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul className="suggestions" 
                    style={this.state.showSuggestions ? {}: { display: 'none' }}>
                    {this.state.suggestions.map((suggestion) => (
                        <li key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                            >{suggestion}</li>
                    ))}
                    <li key="all" onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;