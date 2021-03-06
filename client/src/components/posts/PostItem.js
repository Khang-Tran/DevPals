import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

import {addLike, deletePost, removeLike} from '../../actions/postAction';

class PostItem extends React.Component {
    onDelete = id => {
        this.props.deletePost(id);
    };
    onLike = id => {
        this.props.addLike(id);
    };
    onUnlike = id => {
        this.props.removeLike(id);
    };

    findUserLike = likes => {
        const {auth} = this.props;

        return likes.filter(like => like.user === auth.user.id).length > 0;
    };

    render() {
        const {post, auth, showAction} = this.props;
        return (
            <div className='card card-body mb-3'>
                <div className='row'>
                    <div className='col-md-2'>
                        <Link to={`/profile/${auth.user.handle}`}>
                            <img className='rounded-circle d-none d-md-block'
                                 src={auth.user.avatar}
                                 alt=''/>
                        </Link>
                        <br/>
                        <p className='text-center'>{post.name}</p>
                    </div>
                    <div className='col-md-10'>
                        <p className='lead'>{post.text}</p>
                        {showAction ? <span>
                            <button onClick={e => this.onLike(post._id, e)} type='button'
                                    className='btn btn-light mr-1'>
                            <i className={classnames('fas fa-thumbs-up', {
                                'text-info': this.findUserLike(post.likes)
                            })}/>
                            <span className='badge badge-light'>{post.likes.length}</span>
                        </button>
                        <button onClick={e => this.onUnlike(post._id, e)} type='button' className='btn btn-light mr-1'>
                            <i className='text-secondary fas fa-thumbs-down'/>
                        </button>
                        <Link to={`/post/${post._id}`} className='btn btn-info mr-1'>
                            Comments
                        </Link>
                            {post.user === auth.user.id ?
                                <button type='button' onClick={e => this.onDelete(post._id, e)}
                                        className='btn btn-danger mr-1'>
                                    <i className='fas fa-times'/>
                                </button>
                                : null}
                        </span> : null}
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.defaultProps = {
    showAction: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    showAction: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);