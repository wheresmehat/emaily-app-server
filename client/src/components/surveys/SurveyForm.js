import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";

const FIELDS = [

    { label: "Survey Title", name: "title" },
    { label: "Subject Line", name: "subject" },
    { label: "Email Body", name: "body" },
    { label: "Recipient List", name: "emails" } 
];

class SurveyForm extends Component {

    renderFields() {

        return (

            FIELDS.map(({ label, name }) => (

                <Field
                    label={label}
                    type="text"
                    name={name}
                    component={SurveyField}
                    key={name}
                />

            ))
        );

    }

    render() {

        return (

            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                    </Link>
                    <button 
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );

    }

}

function validate({ title, subject, body, emails }) {     // values object (same as above) destructured

    const errors = {};

    if (!title) {

        errors.title = "You must provide a title";
    }
    console.log(errors);
    
    return errors;
}

export default reduxForm({

    validate,
    form: "surveyForm"

})(SurveyForm);




