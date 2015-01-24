'use strict';

var React = require('react'),
    ValidationUtil = require('../../utils/ValidationUtil');

var ValidatedInput = React.createClass({
    mixins: [],

    getInitialState() {
        return {
            value: this.props.value || '',
            valid: null
        };
    },

    validate(value) {
        var validator = ValidationUtil.getValidationFunction(this.props.validator);
        return validator.test(value);
    },

    componentDidMount() {
        var value = this.props.value || '';
        this.validateAndSetValue(value);
    },

    validateAndSetValue(value) {
        var valid = 'valid';
        if(!this.validate(value)) {
            valid = 'invalid';
        }
        this.setState({
            value: value,
            valid: valid
        });
    },

    changeHandler(e) {
        var newValue = e.currentTarget.value;
        this.validateAndSetValue(newValue);
    },

    render() {
       return (
        <input placeholder={this.props.placeholder} ref={this.props.ref} className={this.props.className + ' ' + this.state.valid} type='text' name={this.props.name} onChange={this.changeHandler} value={this.state.value} />
        );
    },
});

module.exports = ValidatedInput;
