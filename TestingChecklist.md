# This is a refrence checklist for our testing at each release, please ignore :)


### Login
- [X] Login is successful with valid user information.
- [ ] Background image is shown in HTC 10.
- [X] Useful error messages.
- [X] StatusBar is working properly.
- [X] Go to Home screen when is already logged in.
- [X] Keyboard aware is implemented on all text fields.

### Home
- [X] ScrollView.
- [ ] Auto-refresh when showing this screen.
- [X] Clickable cards.
- [X] Whatsapp links.
- [X] StatusBar.
- [X] All registered events are shown.

### Points
- [X] ScrollView.
- [ ] Auto-refresh when shown this screen.
- [X] Stats.
- [X] Icons.

### Events
- [X] ScrollView.
- [ ] Auto-refresh when shown this screen.
- [X] Joining an event.
- [X] Disabled cards for events that are already joined.
#### Add Event
- [X] All fields are working properly.
- [X] Date is correct.
- [X] When a user adds himself, error is shown.
- [X] Notifications is sent when it is the user specify that.
- [X] Error message is shown when a required field is missing.
- [X] Keyboard aware is implemented on all text fields.
#### Manage Events
- [X] All events are shown, attend events "Submit Work" button is disabled.
- [X] Keyboard aware is implemented on all text fields.
##### Submit work
- [X] Can submit multiple work descriptions.
- [X] Submitted work is sent to the admin.
- [X] Instructions are well formatted.
- [x] Deleted participants are not shown.
- [x] Newly added participants are shown.
- [x] Keyboard aware is implemented on all text fields.
##### Manage Single Event
- [x] Fields are already filled with the newest data.
- [x] Saved changes are actually saved and displayed in the Events tab, and will go back to previous screen.
- [x] Ending the event will submit the work of the participants to the club president.
- [x] Cancel and exit button works properly.
- [x] Keyboard aware is implemented on all text fields.

### More
#### Add Points
- [x] Only accessable by the admin.
##### For no reason
- [x] Can submit to multiple users.
- [ ] Can increase/decrease points from a user.
- [x] Keyboard aware is implemented on all text fields.
##### Closed Event
- [x] All closed events are shown as cards.
- [x] All work for each user is displayed.
- [x] Admin will be able to submit points for each user.
- [x] Keyboard aware is implemented on all text fields.

##### Send Notifications
- [x] Only accessable by the admin.
- [x] Notification is sent to all users.
- [x] Keyboard aware is implemented on all text fields.

#### Users
- [x] All users are shown with their bio.
- [x] On click, it will open a Whatsapp chat with the specified user.
- [ ] Users pictures are shown.

#### My Profile
- [x] The user is able to change his/her password with a minimum of 6 characters.
- [x] The user is able to write a bio with a maximum of 50 characters.
- [x] Pressing the buttons will go back to the previous screen.
- [x] Keyboard aware is implemented on all text fields.

#### Events History
- [x] All events that the user has been to (Attendant or Organizor) will be shown.
- [x] If the user was an organizor, all his work will be shown.

#### Signout
- [x] When pressed an alert will be shown to make sure that the user wants to logout.
- [x] When the logout is confirmed, the user will be directed to the Login screen.
