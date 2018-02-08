# This is a refrence checklist for our testing, please ignore :)


- [ ] Keyboard aware is implemented on all text field.

### Login
- [ ] Login is successful with valid user information.
- [ ] Background image is shown in HTC 10.
- [ ] Useful error messages.
- [ ] StatusBar is working properly.
- [ ] Go to Home screen when is already logged in.

### Home
- [ ] ScrollView.
- [ ] Auto-refresh when showing this screen.
- [ ] Clickable cards.
- [ ] Whatsapp links.
- [ ] StatusBar.
- [ ] All registered events are shown.

### Points
- [ ] ScrollView.
- [ ] Auto-refresh when shown this screen.
- [ ] Stats.
- [ ] Icons.

### Events
- [ ] ScrollView.
- [ ] Auto-refresh when shown this screen.
- [ ] Joining an event.
- [ ] Disabled cards for events that are already joined.
#### Add Event
- [ ] All fields are working properly.
- [ ] Date is correct.
- [ ] When a user adds himself, error is shown.
- [ ] Notifications is sent when it is the user specify that.
- [ ] Error message is shown when a required field is missing.
#### Manage Events
- [ ] All events are shown, attend events "Submit Work" button is disabled.
##### Submit work
- [ ] Can submit multiple work descriptions.
- [ ] Submitted work is sent to the admin.
- [ ] Instructions are well formatted.
- [ ] Deleted participants are not shown.
- [ ] Newly added participants are shown.
##### Manage Single Event
- [ ] Fields are already filled with the newest data.
- [ ] Saved changes are actually saved and displayed in the Events tab, and will go back to previous screen.
- [ ] Ending the event will submit the work of the participants to the club president.
- [ ] Cancel and exit button works properly.

### More
#### Add Points
- [ ] Only accessable by the admin.
##### For no reason
- [ ] Can submit to multiple users.
- [ ] Can increase/decrease points from a user.
##### Closed Event
- [ ] All closed events are shown as cards.
- [ ] All work for each user is displayed.
- [ ] Admin will be able to submit points for each user.

##### Send Notifications
- [ ] Only accessable by the admin.
- [ ] Notification is sent to all users.

#### Users
- [ ] All users are shown with their bio.
- [ ] On click, it will open a Whatsapp chat with the specified user.
- [ ] Users pictures are shown.

#### My Profile
- [ ] The user is able to change his/her password with a minimum of 6 characters.
- [ ] The user is able to write a bio with a maximum of 50 characters.
- [ ] Pressing the buttons will go back to the previous screen.

#### Events History
- [ ] All events that the user has been to (Attendant or Organizor) will be shown.
- [ ] If the user was an organizor, all his work will be shown.

#### Signout
- [ ] When pressed an alert will be shown to make sure that the user wants to logout.
- [ ] When the logout is confirmed, the user will be directed to the Login screen.
