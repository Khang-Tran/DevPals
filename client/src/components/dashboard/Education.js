import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileAction';

class Education extends React.Component {
    onDelete = id => {
        this.props.deleteEducation(id);
    };

    render() {
        const education = this.props.education.map(edu =>
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldOfStudy}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
                    {edu.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
                </td>
                <td>
                    <button className='btn btn-danger' onClick={e => this.onDelete(edu._id, e)}>Delete</button>
                </td>
            </tr>
        );
        return (
            <div>
                <h4 className='mb-4'>Education Credentials
                    <table className='table'>
                        <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Field Of Study</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {education}
                        </tbody>
                    </table>
                </h4>
            </div>
        );
    }
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, {deleteEducation})(Education);