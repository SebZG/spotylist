import { useState } from 'react';

import mockData from '../../mockData.json';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import styles from './App.module.css';

function App() {
	const [searchResults, setSearchResults] = useState(mockData);
	const [playlistName, setPlaylistName] = useState("");
	const [playlistTracks, setPlaylistTracks] = useState(mockData);

	const addTrack = (track) => {
		const existingTrack = playlistTracks.find((t) => t.id === track.id);
		// const newTrack = playlistTracks.concat(track);
		if (existingTrack) {
			console.log("Track already exists.");
		} else {
			setPlaylistTracks((prevTracks) => [...prevTracks, track]);
		}
	}

	const removeTrack = (track) => {
		// const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
		setPlaylistTracks((prevTracks) =>
			prevTracks.filter((currentTrack) => currentTrack.id !== track.id));
	}

	const updatePlaylistName = (name) => {
		setPlaylistName(name);
	}

	const savePlaylist = () => {
		const trackURIs = playlistTracks.map((track) => track.uri);
	}

	return (
		<div>
			<h1>Spotylist</h1>

			<div className={styles.App}>
				{/* Add SearchBar component */}

				<div className={styles["App-playlist"]}>
					<SearchResults
						searchResults={searchResults}
						onAdd={addTrack}
					/>
					<Playlist
						playlistName={playlistName}
						playlistTracks={playlistTracks}
						onRemove={removeTrack}
						onNameChange={updatePlaylistName}
						onSave={savePlaylist}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;