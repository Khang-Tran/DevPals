import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {deleteComment} from '../../actions/postAction';

class CommentItem extends React.Component {
    onDelete = (postId, commentId) => {
        this.props.deleteComment(postId, commentId);
    };

    render() {
        const {comment, postId, auth} = this.props;

        return (
            <div className='card card-body mb-3'>
                <div className='row'>
                    <div className='col-md-2'>
                        <Link to={`/profile/${auth.user.handle}`}>
                            <img className='rounded-circle d-none d-md-block'
                                 src={comment.avatar} alt=''/>
                        </Link>
                        <br/>
                        <p className='text-center'>{comment.name}</p>
                    </div>
                    <div className='col-md-10'>
                        <p className='lead'>{comment.text}</p>
                        {comment.user === auth.user.id ?
                            <button type='button' onClick={e => this.onDelete(postId, comment._id, e)}
                                    className='btn btn-danger mr-1'>
                                <i className='fas fa-times'/>
                            </button>
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);
