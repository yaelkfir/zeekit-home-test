SongCloud Specification
=======================

SongCloud is a [SoundCloud](https://soundcloud.com/)-like application, which enables the user to **Explore** new music and listen to it. And if he likes some song, he can create **Playlists** to add those songs to.

Overview
--------

There are four views:
- Signin
- Signup
- Explore
- Playlists

Navigable views from the menu:

![Menu](spec-assets/screenshots/menu.png)

1. **Explore**: The main view, which shows a list of songs from a selected category.
1. **Playlists**: Lists of songs arranged by the playlist they were added to.

Sign In
--------

* URL: `/signin`
* Email input field
  * Accepts valid email value.
  * If email field is empty, an error will be shown.  
    **"Please enter an email"**
  * If there is no user with the current email, an error will be shown.  
    **"No user found with this email address"**
* Password input field
  * If the password is not correct, an error will be shown.  
    **"Incorrect password"**
  * If password field is empty, an error will be shown.  
    **"Please enter a password"**
* "Continue" button should be disabled until both fields are valid.
* A link to "Create Account" page, goes to `/signup`
* Note: We are not implementing "Forgot password" functionality.

Sign Up
---------

* URL: `/signup`
* Email input field
  * Accepts valid email value.
  * If email field is empty, an error will be shown.  
    **"Please enter an email"**
  * If there is already a user with this email, an error will be shown.  
    **"This user already has an account"**
* Password input field
  * If password field is empty, an error will be shown.  
    **"Please enter a password"**
* Continue button will respond only if both fields have values.
* A link to Sign In page, goes to `/signin`

Explore Components
------------------

A list of all components that will be shown in the Explore view.

### Loader

A loader animated icon should be shown when fetching songs data.

* Should also be shown when switching Genre, Page number or using the Search input
* Use one of these [Font Awesome icons](http://fontawesome.io/examples/#animated)
* Make it spin faster by adjusting the icon's `animation-duration` (e.g. `0.6s`)

### Genres

![Genres](spec-assets/screenshots/genres.png)

* A list of predefined genres will be placed under the header.
* When a genre is clicked, the URL will update to `/explore/SELECTED_GENRE`.
* On URL change, a new data set of songs will be fetched from the SoundCloud API and updated in the view.
* Selected genre will be underlined.

### Search

Input field that allows the user to input his search term and get songs according to that search.

* Search functionality will work only of the field is not empty.
* Click on Enter button or on the magnifying glass icon will trigger the search.
* Search results will appear in the same view as explore (will redirect to explore if in playlists).
* If no results were found, a message will appear in the songs section:  
  **"No songs were found for your search"**
* Should adds a param to the URL (???) (**TBD**)

### Logout

![Logout](spec-assets/screenshots/logout.png)

* When clicked, should send a GET request to the server (**TBD**)
* When the server responds, should redirect to the Sign In page

### Explore Title

* Will show the currently selected Genre or Search query based on the URL

### Songs List

![Songs list](spec-assets/screenshots/song-list.png)

* A list of songs displayed according to selected genre or search query.
* Distance between songs will be flexible.
* Songs container will have vertical scroll if songs exceeds the available vertical height.

### Song

Should be a reusable component in Explore and in Playlists

![Song - Add to playlist](spec-assets/screenshots/song-add-to-playlist.png)

* Song title
  * If song name exceeds the song container width, then the name should be truncated and replaced with ellipsis. 
* Duration
  * Song duration should be in `mm:ss` format (e.g. "04:32").
* Artwork
  * The song artwork should appear cropped and centered vertically.
* Playlist icon (heart)
  * The icon have 3 states: Regular (`#D8D8D8`), Hover (`#9B9B9B`), Active (`#2196F3`).
  * When clicked, the icon changes to it's active state and the playlist dropdown is shown.
* Playlists dropdown
  * In Explore, should show a title "Add to Playlist" and a "Create playlist +" button (styled as a link)
  * In Playlists, should show a title "Edit Playlists" without the "Create playlist +" button
  * When "Create playlist +" button is clicked
    * The URL changes to `/playlists`.
    * A new playlist is added with the selected song already in it.
    * The playlists view is scrolled to the new playlist position.
    * The name of the playlist is "Untitled" and it's in edit mode.

#### Song functionality

* When hovering on the song container the artwork will have a dark overlay (50% black),
  and a **play icon** will appear in the middle of the image.
* When clicked, the footer details will be updated and the song will start to play.
* The artwork will stay darkened and a **pause icon** will be shown instead of **play icon**.
* When clicking the **pause icon**, it will change to **pause icon** and the song will pause in the footer.

![Song Playing](spec-assets/screenshots/song-playing.png)
![Song Paused](spec-assets/screenshots/song-paused.png)


### Pagination

![Pagination](spec-assets/screenshots/pagination.png)

* Pagination will appear after the list of songs
* **Prev** button should be disabled on the first page
* Should show the current page number
* There is no final page
* Moving between pages should not update the URL

### Footer player

![Footer player](spec-assets/screenshots/footer-player.png)

* Footer player will be available on both views: Explore and Playlists.
* Footer will be sticky to the bottom of the page.
* Native HTML player will be used to play the media.
* Selected song image and name will be displayed to the left of the player.
* When no song is selected the footer will be hidden. (Initial state)
* If the pause button is clicked on the player, the icon on the corresponding song should change to **play icon**.

Playlists Components
----------------

### Playlists Sidebar Navigation

![Playlist navigation](spec-assets/screenshots/playlist-sidebar.png)

* Located on the left side of the playlists view, the navigation contains an **Add new playlist** button and a list of playlists the user created.
* Clicking on **Add new playlist** will add an empty playlist at the end of the right section, with the name "Untitled" in the playlist header.
  * The right section will be scrolled to the new list header.
  * The header name will be in edit mode (Input field) and it will be focused.
  * The list will have a minimal height similar to one row of songs.
* If there are no songs in a list, a message will be shown instead.  
  **"Add some songs to this playlist."**
* Clicking on one of the playlists names in the sidebar navigation will scroll (with animation) the right section to the desired list (no need to update the URL).

### Song

![Song - Edit playlist](spec-assets/screenshots/song-edit-playlist.png)

* Songs behaves the same as in the Explore view.
* All songs in a playlist will have the heart icon full (Blue heart)
* Dropdown:
  * Title is "Edit Playlists".
  * No "Create playlist +" button.

### Playlist header

![Playlist header](spec-assets/screenshots/playlist-header.png)

* The header will contain the playlist name and a small badge with the number of songs in that playlist.
* On hover a small "Delete" button (Material Design style) will appear.
* Playlist name will be edited in place.
  * A Click on the name will replace it with an input field.
  * The badge will not be shown when editing the name.
  * The input field will contain the playlist name.
  * The user will be able to change the name.
  * On blur or Enter
    * The name will be **saved**.
    * The input field will disappear and switch back to the static playlist name.
* When the **Delete** button is clicked, a prompt will be shown:
    “**Deleting "My Songs" playlist. Are you sure?**”  
  * If the user agrees, the list will be deleted. Otherwise, cancel the action.

### Footer player

* Footer behaves the same as in Explore view.
