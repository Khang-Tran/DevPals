import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPost} from '../../actions/postAction';
import {Link} from 'react-router-dom';

import CommentForm from './CommentForm';
import PostItem from '../posts/PostItem';
import Spinner from '../commons/Spinner';
import CommentFeed from './CommentFeed';

class Post extends React.Component {
    componentDidMount = () => {
        this.props.getPost(this.props.match.params.id);
    };

    render() {
        const {post, loading} = this.props.post;
        let postContent;

        if (post === null || loading || Object.keys(post).length === 0)
            postContent = <Spinner/>;
        else
            postContent =
                <div>
                    <PostItem post={post} showAction={false}/>;
                    <CommentForm postId={post._id}/>
                    <CommentFeed comments={post.comments} postId={post._id}/>
                </div>

        return (
            <div className='post'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <Link to='/feed' className='btn btn-light mb-3'>Back to feed</Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);
