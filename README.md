# jwplayer-live-event-thumbnail

Utilizes JWPlayer webhooks to send alerts out when a livestream goes live. Once live, this lambda function updates the thumbnail for the event.

Lambda contains a hard coded array of events, times, and corresponding thumbnails. These are compared to when the live event runs. `startTime` and `endTime` are arbitrary values. Live streams are activated by humans so they're **not** automated. The `startTime` and `endTime` values are a range when an event should be turned live.

A Sleep function was implemented to give time between thumbnail updates. We were having issues updating the thumbnail on intiial creation. The JWPlayer backend would not contain the media thus not allowing us the ability to update. The Sleep function allows us time between api calls to ensure we're giving JWPlayer time to add the media to their backend.

### To Run Locally

`npm install`

.env file will need to be created for the jwplayer secret

Will need to change the handler function to a main() function and provide a test event.
