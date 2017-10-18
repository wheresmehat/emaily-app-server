import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSurveys } from "../../actions";

class SurveyList extends Component {

    componentDidMount() {

        this.props.fetchSurveys();
    }

    renderSurveys() {

        return this.props.surveys
            .sort((surveyOne, surveyTwo) => {

                return new Date(surveyTwo.dateSent).valueOf() - new Date(surveyOne.dateSent).valueOf();
            })
            .map(survey => (

                <div className="card blue-grey darken-1" key={survey._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString("en-GB")}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                        {survey.lastResponded && 
                        <a className="black-text">
                            Last Responded: {new Date(survey.lastResponded).toLocaleDateString("en-GB")}
                        </a>
                        }
                        
                    </div>
                </div>
        ));
    }

    render() {

        return (

            <div>
                {this.renderSurveys()}
            </div>
        );
    }

};

function mapStateToProps({ surveys }) {

    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);