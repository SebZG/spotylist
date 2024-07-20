import { useState, useEffect } from 'react';

// import mockData from '../../mockData.json';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../utilities/Spotify';

import styles from './App.module.css';

function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [playlistName, setPlaylistName] = useState(localStorage.getItem('playlistName') || "");
	const [playlistTracks, setPlaylistTracks] = useState(JSON.parse(localStorage.getItem('playlistTracks')) || []);
	const [isSaving, setIsSaving] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const addTrack = (track) => {
		const existingTrack = playlistTracks.find((t) => t.id === track.id);
		if (existingTrack) {
			console.log("Track already exists.");
		} else {
			setPlaylistTracks((prevTracks) => [...prevTracks, track]);
			// Store the playlist tracks in local storage
			localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks.concat(track)));
		}
	}

	const removeTrack = (track) => {
		// const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
		setPlaylistTracks((prevTracks) =>
			prevTracks.filter((currentTrack) => currentTrack.id !== track.id));
	}

	const updatePlaylistName = async (name) => {
		setPlaylistName(name);
		// Store the playlist name in local storage
		localStorage.setItem('playlistName', name);
	}

	const savePlaylist = async () => {

		// Check for no playlistTracks && no playlistName
		if (!playlistTracks.length && !playlistName) {
			setErrorMessage("Please add some tracks and a playlist name!");
			return;
		}

		// Check for empty playlistTracks
		if (!playlistTracks.length) {
			setErrorMessage("Please add some tracks!");
			return;
		}

		// Check for empty playlistName
		if (!playlistName) {
			setErrorMessage("Please provide a playlist name!");
			return;
		}

		// Check if playlistName already exists
		try {
			const playlists = await Spotify.getUserPlaylists()
			const existingPlaylist = playlists.find((playlist) => playlist.name === playlistName);

			if (existingPlaylist) {
				setErrorMessage("Playlist already exists!");
				return;
			}
		} catch (error) {
			console.log(error);
		}

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
		});
	}

	// Load the playlistTracks and playlistName from local storage
	useEffect(() => {
		localStorage.setItem('playlistName', playlistName);
		localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
	}, [playlistName, playlistTracks]);

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
						errorMessage={errorMessage}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;