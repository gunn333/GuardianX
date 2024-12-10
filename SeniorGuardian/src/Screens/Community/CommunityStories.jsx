import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './CommunityStories.css';
import {
	FaRegThumbsUp,
	FaThumbsUp,
	FaRegComment,
	FaUserCircle
} from 'react-icons/fa';

const CommunityStories = () => {
	const [incidents, setIncidents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [likes, setLikes] = useState({});
	const [comments, setComments] = useState({});
	const [selectedIncident, setSelectedIncident] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchIncidents = useCallback(async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/api/incidents?page=${page}&limit=10`
			);
			if (response.data.length === 0) {
				setHasMore(false);
			} else {
				setIncidents(prevIncidents => {
					const newIncidents = response.data.filter(
						incident =>
							!prevIncidents.some(
								prev => prev._id === incident._id
							)
					);
					return [...prevIncidents, ...newIncidents];
				});
			}
		} catch (error) {
			console.error('Error fetching incidents:', error);
		} finally {
			setLoading(false);
		}
	}, [page]);

	useEffect(() => {
		fetchIncidents();
	}, [fetchIncidents]);

	const handleLoadMore = () => {
		if (hasMore) {
			setPage(prevPage => prevPage + 1);
		}
	};

	const handleLike = async id => {
		try {
			const isLiked = likes[id] === true;
			await axios.put(`http://localhost:3000/api/incidents/${id}/like`, {
				like: !isLiked
			});
			setLikes(prevLikes => ({
				...prevLikes,
				[id]: !isLiked
			}));
		} catch (error) {
			console.error('Failed to toggle like:', error);
		}
	};

	const handleComment = id => {
		setSelectedIncident(prevSelected => (prevSelected === id ? null : id));
		setIsModalOpen(true); 
	};

	const submitComment = async (id, newComment) => {
		if (newComment.trim() === '') return;
		try {
			await axios.post(
				`http://localhost:3000/api/incidents/${id}/comment`,
				{ text: newComment }
			);
			setComments(prevComments => ({
				...prevComments,
				[id]: [...(prevComments[id] || []), newComment]
			}));
		} catch (error) {
			console.error('Failed to add comment:', error);
		}
	};

	const renderIncident = incident => (
		<div key={incident._id} className="incident-card">
			<div className="incident-header">
				<div className="incident-user">
					<FaUserCircle className="profile-icon" />
					<span className="incident-name">
						{incident.isAnonymous ? 'Anonymous' : incident.name}
					</span>
				</div>
			</div>
			<p className="incident-story">{incident.story}</p>
			<div className="incident-footer">
				<div>
					<button
						className="like-button"
						onClick={() => handleLike(incident._id)}
					>
						{likes[incident._id] ? (
							<FaThumbsUp />
						) : (
							<FaRegThumbsUp />
						)}{' '}
						{incident.likes || 0}
					</button>
					<button
						className="comment-button"
						onClick={() => handleComment(incident._id)}
					>
						<FaRegComment /> {incident.comments.length}
					</button>
				</div>
				<span className="incident-time">
					{new Date(incident.createdAt).toLocaleString()}
				</span>
			</div>
		</div>
	);

	const renderCommentsModal = () => (
		<div className="comments-modal">
			<div className="modal-content">
				<div className="incident-header">
					<div className="incident-user">
						<FaUserCircle className="profile-icon" />
						<span className="incident-name">Post</span>
					</div>
				</div>
				<p className="incident-story">
					{
						incidents.find(
							incident => incident._id === selectedIncident
						)?.story
					}
				</p>
				<div className="comments-list">
					{comments[selectedIncident]?.map((comment, idx) => (
						<div key={idx} className="comment-item">
							<FaUserCircle className="profile-icon" />
							<p className="comment">{comment}</p>
						</div>
					))}
					{incidents
						.find(incident => incident._id === selectedIncident)
						?.comments.map((comment, idx) => (
							<div key={idx} className="comment-item">
								<FaUserCircle className="profile-icon" />
								<p className="comment">{comment.text}</p>
							</div>
						))}
				</div>
				<input
					type="text"
					placeholder="Add a comment"
					onKeyDown={e => {
						if (e.key === 'Enter') {
							submitComment(selectedIncident, e.target.value);
							e.target.value = '';
						}
					}}
				/>
				<button
					className="close-modal"
					onClick={() => setIsModalOpen(false)}
				>
					Close
				</button>
			</div>
		</div>
	);

	return (
		<div className="community-stories">
			<h2>Community Stories</h2>
			{loading && page === 1 ? (
				<div className="loading">Loading...</div>
			) : incidents.length === 0 ? (
				<p>No incidents to display yet. Be the first to share.</p>
			) : (
				<div className="incident-cards-container">
					{incidents.map(incident => renderIncident(incident))}
				</div>
			)}

			{hasMore && !selectedIncident && (
				<button onClick={handleLoadMore} className="load-more">
					Load More
				</button>
			)}

			{isModalOpen && renderCommentsModal()}
		</div>
	);
};

export default CommunityStories;
