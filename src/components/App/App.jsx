import { useState } from 'react';

// import mockData from '../../mockData.json';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../utilities/Spotify';
import Loading from '../Loading/Loading';

import styles from './App.module.css';
// import TrackList from '../TrackList/TrackList';

function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [playlistName, setPlaylistName] = useState("");
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [isSaving, setIsSaving] = useState(false);

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
		setIsSaving(true);
		const trackUris = playlistTracks.map((track) => track.uri);
		Spotify.savePlaylist(playlistName, trackUris).then(() => {
			setTimeout(() => {
				setPlaylistName("");
				setPlaylistTracks([]);
				setIsSaving(false);
			}, 2000);
		});
	}

	const search = (term) => {
		Spotify.search(term).then((results) => {
			setSearchResults(results)
			// console.log(results);
		});
		console.log(term);
	}

	return (
		<div>
			<h1>Spotylist</h1>

			<div className={styles.App}>
				<SearchBar onSearch={search} />

				<div className={styles["App-playlist"]}>
					<SearchResults
						tracks={searchResults.filter((track) =>
							!playlistTracks.some((playlistTracks) => playlistTracks.id === track.id))}
						// searchResults={searchResults}
						onAdd={addTrack}
					/>
					<Playlist
						playlistName={playlistName}
						playlistTracks={playlistTracks}
						onRemove={removeTrack}
						onNameChange={updatePlaylistName}
						onSave={savePlaylist}
						isSaving={isSaving}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;